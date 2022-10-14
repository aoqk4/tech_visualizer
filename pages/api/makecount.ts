// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import convert from "xml-js";
import { PrismaClient, techNeeds } from "@prisma/client";

const prisma = new PrismaClient();

type Data = {
  name?: String;
  err?: String | undefined;
  result?: Object;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const wantemail = req.body;
    const already = prisma.counter.findUnique({
      where: {
        email: wantemail,
      },
    });
    if (!already) {
      await prisma.counter.create({
        data: {
          email: wantemail,
        },
      });
    }
  } catch (err) {
  } finally {
    prisma.$disconnect();
  }
}
