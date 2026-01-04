import React from 'react';
import GenericForm from './BlockForms/GenericForm';
import HeroForm from './BlockForms/HeroForm';
import MenuForm from './BlockForms/MenuForm';
import FeatureForm from './BlockForms/FeatureForm';
import ServicesForm from './BlockForms/ServicesForm';
import MaintenanceForm from './BlockForms/MaintenanceForm';
import ProductsForm from './BlockForms/ProductsForm';
import CableConfigForm from './BlockForms/CableConfigForm';
import ContactForm from './BlockForms/ContactForm';
import FooterForm from './BlockForms/FooterForm';

type Props = {
    blockType: string;
    content: any;
    onChange: (content: any) => void;
};

export default function BlockEditorForm({ blockType, content, onChange }: Props) {
    switch (blockType) {
        case 'hero':
        case 'HeroBlock':
            return <HeroForm content={content} onChange={onChange} />;
        case 'menu':
        case 'MenuBlock':
            return <MenuForm content={content} onChange={onChange} />;
        case 'feature':
        case 'FeatureBlock':
            return <FeatureForm content={content} onChange={onChange} />;
        case 'services':
        case 'ServicesAccordionBlock':
            return <ServicesForm content={content} onChange={onChange} />;
        case 'maintenance':
        case 'MaintenanceBlock':
            return <MaintenanceForm content={content} onChange={onChange} />;
        case 'products':
        case 'ProductsBlock':
            return <ProductsForm content={content} onChange={onChange} />;
        case 'cableConfig':
        case 'CableConfigBlock':
            return <CableConfigForm content={content} onChange={onChange} />;
        case 'contact':
        case 'ContactBlock':
            return <ContactForm content={content} onChange={onChange} />;
        case 'footer':
        case 'FooterBlock':
            return <FooterForm content={content} onChange={onChange} />;
        default:
            return <GenericForm content={content} onChange={onChange} />;
    }
}
