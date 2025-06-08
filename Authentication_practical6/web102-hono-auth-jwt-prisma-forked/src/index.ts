import { Hono } from "hono";
import { cors } from "hono/cors";
import { PrismaClient, Prisma } from "@prisma/client";
import { HTTPException } from "hono/http-exception";
import { jwt, sign } from "hono/jwt";
import type { JwtVariables } from "hono/jwt";

// Extend Hono context with JWT
type Variables = JwtVariables;
const app = new Hono<{ Variables: Variables }>();

// Enable CORS
app.use("*", cors());

// Prisma client
const prisma = new PrismaClient();

// Secret for JWT (In production, store in .env securely)
const JWT_SECRET = "mySecretKey";

//  REGISTER
app.post("/register", async (c) => {
  try {
    const body = await c.req.json();

    const bcryptHash = await Bun.password.hash(body.password, {
      algorithm: "bcrypt",
      cost: 4,
    });

    const user = await prisma.user.create({
      data: {
        email: body.email,
        hashedPassword: bcryptHash,
        Account: {
          create: { balance: 0 },
        },
      },
    });

    return c.json({ message: `${user.email} created successfully` });
  } catch (e) {
    console.error("Register error:", e);
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      return c.json({ message: "email already exists" });
    }
    return c.json({ error: "Registration failed" });
  }
});

//  LOGIN
app.post("/login", async (c) => {
  try {
    const body = await c.req.json();

    const user = await prisma.user.findUnique({
      where: { email: body.email },
      select: { id: true, hashedPassword: true },
    });

    if (!user) {
      return c.json({ message: "User not found" });
    }

    const match = await Bun.password.verify(body.password, user.hashedPassword, "bcrypt");

    if (!match) {
      throw new HTTPException(401, { message: "Invalid credentials" });
    }

    const payload = {
      sub: user.id,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 12, // 12 hours
    };

    const token = await sign(payload, JWT_SECRET);

    return c.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    throw new HTTPException(401, { message: "Invalid credentials" });
  }
});

//  MIDDLEWARE to protect routes
app.use("/protected/*", jwt({ secret: JWT_SECRET }));

//  PROTECTED ROUTE
app.get("/protected/account/balance", async (c) => {
  const payload = c.get("jwtPayload");

  if (!payload) {
    throw new HTTPException(401, { message: "Unauthorized" });
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.sub },
    select: {
      Account: {
        select: { balance: true, id: true },
      },
    },
  });

  return c.json({ data: user });
});

//  Start the server
export default app;
