import { PropertyType } from "./types";

export const PROPERTIES: PropertyType[] = [
  {
    id: 1,
    title: 'Casa Cedro Azul. Pool, grill and wood-burning home',
    tagline: 'Entire villa in Carmen de Areco, Argentina',
    description: `Relajate en este alojamiento único.
    Ideal para escaparte de la zona urbana con espacios verdes  en el exterior y estilo Rural dentro de la casa. 
    Zona tranquila donde podes disfrutar de momentos con amigos o en familia. 
    Parrilla, pileta y hogar a leña son detalles que necesitas para disfrutar en cualquier epoca del año.`,
    amenities: [1, 2, 3, 6, 7, 8, 10, 13],
    address: 'Av. Domingo Faustino Sarmiento 701',
    images: ['1-outdoor.webp', '1-kitchen.webp', '1-bathroom.webp', '1-badroom.webp'],
    price: 154.65,
    rating: 4.67
  },
  {
    id: 2,
    title: 'Cabana dos Ventos',
    tagline: 'Entire chalet in Itajubá, Brazil',
    description: `Esqueça de suas preocupações neste lugar espaçoso e tranquilo.
    Em meio à Mantiqueira a 1300 m de altitude, vizinha de uma unidade de conservação, com trilhas e cachoeiras privativas. 
    À 14 km de Itajubá, em estrada rural,  conhecida pela prática de Mountain bike e lugares cênicos.`,
    amenities: [1, 2, 3, 6, 7, 8, 10, 13, 15, 16, 17, 21, 22, 23, 26, 27],
    address: 'Av. Domingo Faustino Sarmiento 701',
    images: ['2-place.webp', '2-room.webp', '2-patio.webp', '2-bathroom.webp'],
    price: 245.40,
    rating: 4.40
  },
  {
    id: 3,
    title: 'Chalet w/fireplace on the wine trail',
    tagline: 'Entire chalet in São Roque, Brazil',
    description: `Our accommodation is a 2-story Swiss chalet style house, ideal for couples or families who want to enjoy a lot of tranquility close to nature, with comfort, safety and structure, all this 300 meters from the WINE ROAD, the main destination for wine tourism and cuisine in the region.
    The house has on its ground floor a living room with fireplace and smart TV, full kitchen, bathroom, washer and dryer.
    Upstairs we have a half bathroom, two bedrooms and a balcony.`,
    amenities: [2, 3, 6, 7, 8, 10, 13, 21, 22, 23, 24, 25, 26],
    address: 'Av. Domingo Faustino Sarmiento 701',
    images: ['3-land.webp', '3-kitchen.webp', '3-fireplace.webp', '3-bathroom.webp'],
    price: 125.00,
    rating: 3.80
  },
  {
    id: 4,
    title: 'Chalé da Jaque - Praia do Forte | Jurerê Int',
    tagline: 'Entire chalet in Jurerê, Brazil',
    description: `Cozy chalet in Praia do Forte - Jurerê Internacional. Located 400m from Praia do Forte, 400m from Parador 12 and 150m from Fortaleza São José da Ponta Grossa.
    It is a great choice for those looking to relax and stay in touch with the nature.
    The view from the chalet is to Praia do Forte where you can enjoy the sunset, in addition to the fresh air and the noise of the waves further favors the guest experience.`,
    amenities: [2, 3, 6, 7, 8, 10, 13, 21, 22, 23, 24, 25, 26],
    address: 'Av. Domingo Faustino Sarmiento 701',
    images: ['4-bathroom.webp', '4-backyard.webp', '4-kitchen.webp', '4-bathroom2.webp'],
    price: 220.00,
    rating: 4.10
  }
]