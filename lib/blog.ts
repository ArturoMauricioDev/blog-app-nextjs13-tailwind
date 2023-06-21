import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

import { Blog } from "@/interfaces/blog";

const getDir = (path: string) => join(process.cwd(), path);
const BLOG_DIR = getDir("/content/blogs");

const getFileNames = (dir: string): string[] => fs.readdirSync(dir);

const getBlogFileNames = () => getFileNames(BLOG_DIR);

const getItemInPath = (filePath: string) => {
  const fileContent = fs.readFileSync(filePath, "latin1");
  const { data, content } = matter(fileContent);
  return { ...data, content } as Blog;
};

const getBlogs = (): Blog[] => {
  const names = getBlogFileNames();
  const items = names.map((name) => getItemInPath(join(BLOG_DIR, name)));
  return items;
};

export { getBlogFileNames, getBlogs };
