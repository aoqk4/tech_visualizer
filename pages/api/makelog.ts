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
    const wantCorS = req.body;

    const makelog = await prisma.log.create({
      data: {
        counterEmail: wantCorS,
      },
    });
  } catch (err) {
  } finally {
    prisma.$disconnect();
  }
}
