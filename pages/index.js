import Link from "next/link";
import { client } from "../libs/client";
import {  Box,
          Flex,
          Heading, 
          Text,
          Stack,
          Avatar,
          Image,
          ChatIcon } from "@chakra-ui/react";

export default function Home({ blog }) {
  return (
      <Flex p="6" w="100vw" h="100vh" bg="gray.300">
        <Flex as="header"
              top={0}
              width="full"
              h="50vh"
              shadow="sm"
              my={4}
              p={8}
              bg="white"
              rounded="xl"
        >
          <ul>
            {blog.map((blog) => (
              <li key={blog.id}>
                <Link href={`/blog/${blog.id}`}>
                  <a>{blog.title}</a>
                </Link>
              </li>
            ))}
          </ul>
      </Flex>
    </Flex>
  );
}

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "blog" });

  return {
    props: {
      blog: data.contents,
    },
  };
};

