import Image from "next/image";
import { prismaClient } from "./lib/prisma";
import CategoryItem from "./components/categoryItem";
import Section from "./components/section";
import Banner from "./components/banner";

const Home = async () => {
  const categories = await prismaClient.category.findMany({});

  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 7,
  });

  return (
    <>
      <div>
        <Banner
          src={"/mobile-first-banner.png"}
          alt="Até 55% de desconto só este mês."
          className="flex h-auto w-full px-5 py-7 md:hidden"
        />

        <Banner
          src={"/desktop-first-banner.png"}
          alt="Ofertas imperdíveis! Até 55% de desconto só este mês."
          className="hidden h-auto w-full md:flex"
        />

        {categories.length > 0 && (
          <div className="grid w-full grid-cols-2 grid-rows-3 gap-3 overflow-x-scroll px-5 py-5 md:flex md:items-center md:gap-3 md:px-24 lg:justify-between [&::-webkit-scrollbar]:hidden">
            {categories.map((category) => (
              <CategoryItem key={category.id} category={category} />
            ))}
          </div>
        )}

        <Section title="Deals" products={deals} href="/deals" />
      </div>
    </>
  );
};

export default Home;
