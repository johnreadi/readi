import React from 'react';
import { BlockData } from '../types';
import MenuBlock from './blocks/MenuBlock';
import HeroBlock from './blocks/HeroBlock';
import AccordionBlock from './blocks/AccordionBlock';
import FeaturesBlock from './blocks/FeaturesBlock';

export default function BlockRenderer({ block }: { block: BlockData }) {
  switch (block.type) {
    case 'menu':
      return <MenuBlock content={block.content} />;
    case 'hero':
      return <HeroBlock content={block.content} />;
    case 'accordion':
      return <AccordionBlock content={block.content} />;
    case 'features':
      return <FeaturesBlock content={block.content} />;
    default:
      return <div className="text-center p-4">Unknown block type: {block.type}</div>;
  }
}
