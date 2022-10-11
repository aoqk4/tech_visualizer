// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import convert from "xml-js";
import { PrismaClient, techNeeds } from "@prisma/client";

const prisma = new PrismaClient();

type Data = {
  name?: String;
  err?: String | undefined;
  result?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    if (req.method !== "POST") {
      res.status(504).json({ err: "요청 방식이 잘못되었습니다." });
    } else {
      let rObj = JSON.parse(req.body);

      const uLogin = await prisma.user.findFirst({
        where: {
          email: rObj.umail,
          AND: {
            password: rObj.upsd,
          },
        },
      });

      res.status(200).json({ result: uLogin });
    }
  } catch (err) {
    console.log(err);
  } finally {
    prisma.$disconnect();
  }
}
