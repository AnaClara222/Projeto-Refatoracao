import { Request, Response } from "express";
import httpStatus from "http-status";
import * as newsService from "../services/news-service";
import { CreateNewsData } from "../repositories/news-repository";

function parseId(idParam: string): number | null {
  const id = Number.parseInt(idParam);
  return Number.isNaN(id) || id <= 0 ? null : id;
}

export async function getNews(req: Request, res: Response) {
  const page = Number.parseInt(req.query.page as string) || 1;
  const order = (req.query.order as "asc" | "desc") || "desc";
  const title = req.query.title as string | undefined;

  const news = await newsService.getFilteredNews({ page, order, title });
  return res.send(news);
}

export async function getSpecificNews(req: Request, res: Response) {
  const id = parseId(req.params.id);
  if (!id) return res.status(httpStatus.BAD_REQUEST).send("Invalid id");

  const news = await newsService.getSpecificNews(id);
  return res.send(news);
}

export async function createNews(req: Request, res: Response) {
  const newsData = req.body as CreateNewsData;
  const createdNews = await newsService.createNews(newsData);
  return res.status(httpStatus.CREATED).send(createdNews);
}

export async function updateNews(req: Request, res: Response) {
  const id = parseId(req.params.id);
  if (!id) return res.status(httpStatus.BAD_REQUEST).send("Invalid id");

  const newsData = req.body as CreateNewsData;
  const updatedNews = await newsService.updateNews(id, newsData);
  return res.send(updatedNews);
}

export async function deleteNews(req: Request, res: Response) {
  const id = parseId(req.params.id);
  if (!id) return res.status(httpStatus.BAD_REQUEST).send("Invalid id");

  await newsService.deleteNews(id);
  return res.sendStatus(httpStatus.NO_CONTENT);
}
