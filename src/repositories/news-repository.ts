import prisma from "./../database";
import { News, Prisma } from "@prisma/client";

export type CreateNewsData = Omit<News, "id" | "createAt">;

const ORDER_DESC = "desc";

export function parsePublicationDate(date: string | Date): Date {
  return typeof date === "string" ? new Date(date) : date;
}

export function getNews() {
  return prisma.news.findMany({
    orderBy: { publicationDate: ORDER_DESC },
  });
}

export function getNewsById(id: number) {
  return prisma.news.findUnique({ where: { id } });
}

export async function getNewsWithFilters(params: {
  page?: number;
  order?: "asc" | "desc";
  title?: string;
}) {
  const { page = 1, order = "desc", title } = params;
  const take = 10;
  const skip = (page - 1) * take;

  const where: Prisma.NewsWhereInput = title
    ? { title: { contains: title, mode: "insensitive" } } 
    : {};

  return prisma.news.findMany({
    where,
    orderBy: { publicationDate: order },
    skip,
    take,
  });
}

export async function findNewsByTitle(title: string) {
  return prisma.news.findFirst({ where: { title } });
}

export async function createNews(newsData: CreateNewsData) {
  return prisma.news.create({
    data: { ...newsData, publicationDate: parsePublicationDate(newsData.publicationDate) },
  });
}

export async function updateNews(id: number, newsData: CreateNewsData) {
  return prisma.news.update({
    where: { id },
    data: { ...newsData, publicationDate: parsePublicationDate(newsData.publicationDate) },
  });
}

export async function removeNews(id: number) {
  return prisma.news.delete({ where: { id } });
}
