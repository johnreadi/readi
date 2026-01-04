import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Clean up existing data to prevent duplication
  await prisma.block.deleteMany({});
  await prisma.page.deleteMany({});
  await prisma.user.deleteMany({});
  console.log('Cleaned up existing data.');

  // Create Admin User
  const passwordHash = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@readi.fr' },
    update: {},
    create: {
      email: 'admin@readi.fr',
      name: 'Admin Readi',
      password: passwordHash,
      role: 'admin',
    },
  });
  console.log(`Created user: ${admin.email}`);

  // Create Page: Home Page
  const homePage = await prisma.page.upsert({
    where: { slug: 'home' },
    update: {},
    create: {
      slug: 'home',
      title: 'Accueil',
      metaDesc: 'Réparation traceurs, imprimante, création site web, dépannage électronique, affichage dynamique',
    },
  });

  console.log(`Created page: ${homePage.title}`);

  // Define Blocks Data
  const blocks = [
    {
      type: 'menu',
      order: 1,
      content: {
        logo: "/assets/images/readi27-140x43.png",
        brandName: "Pro depuis 1994",
        phone: "02.35.62.40.46",
        items: [
          { label: "AFFICHAGE DYNAMIQUE", link: "#features1-v" },
          { label: "INFORMATIQUE & MAINTENANCE", link: "#features12-x" },
          { label: "PIECES DETACHEES", link: "#content7-z" },
          { label: "CONTACT", link: "#contact-form" },
        ]
      }
    },
    {
      type: 'hero',
      order: 2,
      content: {
        title: "SERVICE DU PRO ...",
        subtitle: "READI.FR c'est :",
        animatedWords: ["La Compétence", "La Rapidité", "L'Expérience"],
        backgroundImage: "/assets/images/mbr-1920x1280.jpg"
      }
    },
    {
      type: 'services',
      order: 3,
      content: {
        title: "Nos domaines de services",
        subtitle: "Nous intervenons sur site s'il y a lieu et par accord avec nos clients, effectuons les travaux sur acceptation du devis préalablement établi d'après nos tarifs et conditions légales de vente.",
        items: [
          {
            title: "Affichage Dynamique",
            content: "Un écran en vitrine est tout simplement plus pratique que le papier !<br><br>L’écran d’affichage dynamique dans une vitrine de magasin donne une image très esthétique et moderne à votre vitrine. Et cela, peu importe votre positionnement.<br><br>Un écran LED pour vitrine offre aussi un nouveau monde de possibilités en termes de communication."
          },
          {
            title: "Réparation: Electronique & Installation",
            content: "Réparer votre appareil, c’est prolonger sa durée de vie tout en faisant un bon geste pour l’environnement. Pourquoi acheter un nouvel appareil quand la réparation est possible ?<br>Nous installons les antennes parabolique. Nous sommes agréés ORANGE TV"
          },
          {
            title: "Maintenance PC & Périphériques",
            content: "Notre grande expérience dans le domaine de la réparation informatique nous permet de faire face à la plupart des dysfonctionnements & pannes matérielles rencontrés. Cela nous permet de s'adapter à toutes les configurations quelle que soit l'ancienneté de votre configuration matérielle. Nous proposons une solution de sauvegarde et de protection des données sur mesure adaptée à nos clients."
          },
          {
            title: "Formation & Création Web",
            content: "<br>Savoir préparer et organiser les contenus prévus pour le site<br><br>Comprendre comment créer un site Internet<br><br>Maîtriser les facettes de l'outil de la création des pages et des éléments de base de données &nbsp;<br><br>Comprendre et maîtriser la mise en page en ligne du site internet et sa maintenance&nbsp;<br><br>Disposer des bases pour configurer un serveur Web<br><br>Être capable d'enrichir le contenu d’un site (Textes, vidéos, liens dynamiques)&nbsp;<br>"
          }
        ]
      }
    },
    {
      type: 'feature',
      order: 4,
      content: {
        id: "features2-u",
        title: "Affichage Dynamique",
        text: "Nous proposons un système d'affichage dynamique moderne et moins cher à nos clients. Nous sommes en mesure aujourd'hui de fournir et d'installer à nos clients un système holographique 3D autonome ou piloté",
        image: "/assets/images/affichage1-1080x600.png",
        reverse: true
      }
    },
    {
      type: 'feature',
      order: 5,
      content: {
        id: "features1-v",
        title: "3D Holographique",
        text: "C'est un système de ventilation des Leds qui donne l'illusion de flottabilité des objets dans l'espace, Très simple à mettre en place et moins coûteux. Par contre, il faut avoir une petite compétence dans la réalisation des vidéos et des maquettes",
        image: "/assets/images/signage2-503x293.png",
        reverse: false
      }
    },
    {
      type: 'maintenance',
      order: 6,
      content: {
        title: "Maintenance & Installation",
        cards: [
          {
            title: "Imprimantes Toute Marque",
            text: "Nous réparons toute marque d'imprimante de toute technologie, cependant en cas de remplacement de pièce si nécessaire, un devis est obligatoirement établi.",
            image: "/assets/images/mbr-3-792x592.jpg"
          },
          {
            title: "Copieurs Toute Marque",
            text: "Nous intervenons toujours sur site, sans embarquer le produit. Le devis inclut le déplacement et le forfait du diagnostic",
            image: "/assets/images/mbr-5-792x792.jpg"
          },
          {
            title: "Traceurs et Scanner grand format",
            text: "Nos partenaire actuels, nous ont toujours fait confiance dans la réactivité, la compétence et la qualité de notre intervention. Ils continuent à garder ce lien, dû à notre expérience dans le grand format",
            image: "/assets/images/mbr-1-792x526.jpg"
          },
          {
            title: "Informatique , Accesoires & Consommables",
            text: "Ayant de l'expérience depuis les débuts de l'informatique grand public, du DOS jusqu'à nos jours; nos clients, croient en notre expertise du fait de notre mise à jour dans l'évolution de cette technologie. Nous fournissons des conseils et des consommables de qualité à nos clients",
            image: "/assets/images/mbr-792x559.jpg"
          },
          {
            title: "Installation Antennes Paraboliques",
            text: "Agréé par Orange TV et son partenaire dans l'installation et le paramétrage du matériel de réception satellitaire, nous répararons aussi des postes de TV et installons le système de surveillance par Caméras IP",
            image: "/assets/images/mbr-6-792x975.jpg"
          },
          {
            title: "Développement Site Web ( Statique & Dynamique )",
            text: "Nous créons des sites internet et intranet dédiés. Formons les clients qui souhaitent eux-même créer et maintenir leur site. Pour les clients désireux de découvrir les CMS, tels que ( WordPress, Joomla, Drupal, PrestaShop et OpenCart ), une base rapide dans la prise en main leur sera dispensée en quelques heures. Faites juste une demande de devis",
            image: "/assets/images/mbr-792x528.jpg"
          }
        ]
      }
    },
    {
      type: 'products',
      order: 7,
      content: {
        title: "Trouvez les références d'origine des produits & pièces détachées constructeurs. Veuillez nous envoyer votre choix pour un devis",
        iframeUrl: "https://www.eetgroup.com/fr-fr/external-guides/productguide?externalId=855948f7-0461-4b48-b2d6-1ab51285adc7&guideId=all"
      }
    },
    {
      type: 'cableConfig',
      order: 8,
      content: {
        title: "Configurez vous-même votre Câble, et nous communiquer la référence pour un devis",
        iframeUrl: "https://www.eetgroup.com/fr-fr/external-guides/productguide?externalId=fbb885a1-d180-4a3f-911b-6c35504b3862&guideId=cable",
        backgroundImage: "/assets/images/mbr-1920x1080.jpg"
      }
    },
    {
      type: 'contact',
      order: 9,
      content: {
        title: "Contactez-nous"
      }
    },
    {
      type: 'footer',
      order: 10,
      content: {}
    }
  ];

  for (const block of blocks) {
    await prisma.block.create({
      data: {
        type: block.type,
        order: block.order,
        content: JSON.stringify(block.content),
        pageId: homePage.id,
      },
    });
    console.log(`Created block: ${block.type}`);
  }

  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
