import { prisma } from '@/lib/prisma';
import MenuBlock from '@/components/blocks/MenuBlock';
import HeroBlock from '@/components/blocks/HeroBlock';
import ServicesAccordionBlock from '@/components/blocks/ServicesAccordionBlock';
import FeatureBlock from '@/components/blocks/FeatureBlock';
import MaintenanceBlock from '@/components/blocks/MaintenanceBlock';
import ProductsBlock from '@/components/blocks/ProductsBlock';
import CableConfigBlock from '@/components/blocks/CableConfigBlock';
import ContactBlock from '@/components/blocks/ContactBlock';
import FooterBlock from '@/components/blocks/FooterBlock';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

const BLOCK_COMPONENTS: { [key: string]: any } = {
  MenuBlock: MenuBlock,
  HeroBlock: HeroBlock,
  ServicesAccordionBlock: ServicesAccordionBlock,
  FeatureBlock: FeatureBlock,
  MaintenanceBlock: MaintenanceBlock,
  ProductsBlock: ProductsBlock,
  CableConfigBlock: CableConfigBlock,
  ContactBlock: ContactBlock,
  FooterBlock: FooterBlock,
  // Legacy
  menu: MenuBlock,
  hero: HeroBlock,
  services: ServicesAccordionBlock,
  feature: FeatureBlock,
  maintenance: MaintenanceBlock,
  products: ProductsBlock,
  cableConfig: CableConfigBlock,
  contact: ContactBlock,
  footer: FooterBlock,
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await prisma.page.findUnique({
    where: { slug },
  });

  if (!page) return {};

  return {
    title: page.title,
    description: page.metaDesc,
  };
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params;
  
  const page = await prisma.page.findUnique({
    where: { slug },
    include: {
      blocks: {
        orderBy: { order: 'asc' },
      },
    },
  });

  if (!page) {
    notFound();
  }

  return (
    <main>
      {page.blocks.map((block) => {
        const Component = BLOCK_COMPONENTS[block.type];
        if (!Component) {
          console.warn(`Unknown block type: ${block.type}`);
          return <div key={block.id}>Unknown block type: {block.type}</div>;
        }

        let content;
        try {
            content = JSON.parse(block.content);
        } catch (e) {
            console.error(`Error parsing JSON for block ${block.id}:`, e);
            return <div key={block.id} style={{color: 'red'}}>Error loading block {block.type}</div>
        }

        return (
          <Component 
            key={block.id} 
            content={content} 
            reverse={content.reverse}
          />
        );
      })}
    </main>
  );
}
