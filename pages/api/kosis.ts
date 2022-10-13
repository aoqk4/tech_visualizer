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
    fetch(
      `https://kosis.kr/openapi/Param/statisticsParameterData.do?method=getList&apiKey=${process.env.apikey}&itmId=B+&objL1=A01+A02+A03+A04+A05+A06+A07+A08+A09+A10+A11+A12+A13+A14+A15+A16+A17+A18+&objL2=&objL3=&objL4=&objL5=&objL6=&objL7=&objL8=&format=json&jsonVD=Y&prdSe=Y&newEstPrdCnt=3&orgId=127&tblId=DT_127003_011`
    )
      .then((res) => res.json())
      .then((json) => res.status(200).json({ result: json }));
  } catch (err) {
    console.log(err);
  }
}
