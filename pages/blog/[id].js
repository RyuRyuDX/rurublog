import { client } from "../../libs/client";
import {  Box,
  Flex,
  Heading, 
  Text,
  Stack,
  Avatar,
  Image,
  ChatIcon } from "@chakra-ui/react";

export default function BlogId({ blog }) {
  return (
    <Flex p="6" w="100vw" h="100vh" bg="gray.300">
    <h1>{blog.title}</h1>
      <p>{blog.publishedAt}</p>
      <div
        dangerouslySetInnerHTML={{
          __html: `${blog.body}`,
        }}
      />
    </Flex>
  );
}

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "blog" });

  const paths = data.contents.map((content) => `/blog/${content.id}`);
  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: "blog", contentId: id });

  return {
    props: {
      blog: data,
    },
  };
};