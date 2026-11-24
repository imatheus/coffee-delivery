import arabeImg from '../assets/coffees/arabe.png'
import cafeComLeiteImg from '../assets/coffees/cafe-com-leite.png'
import capuccinoImg from '../assets/coffees/capuccino.png'
import chocolateQuenteImg from '../assets/coffees/chocolate-quente.png'
import cubanoImg from '../assets/coffees/cubano.png'
import expressoAmericanoImg from '../assets/coffees/expresso-americano.png'
import expressoCremosoImg from '../assets/coffees/expresso-cremoso.png'
import expressoGeladoImg from '../assets/coffees/expresso-gelado.png'
import expressoTradicionalImg from '../assets/coffees/expresso-tradicional.png'
import havaianoImg from '../assets/coffees/havaiano.png'
import irlandesImg from '../assets/coffees/irlandes.png'
import latteImg from '../assets/coffees/latte.png'
import macchiatoImg from '../assets/coffees/macchiato.png'
import mocaccinoImg from '../assets/coffees/mocaccino.png'
import type { Coffee } from '../types/coffee'

export const COFFEES: readonly Coffee[] = [
  {
    id: 'expresso-tradicional',
    name: 'Expresso Tradicional',
    description: 'O tradicional café feito com água quente e grãos moídos',
    tags: ['Tradicional'],
    priceInCents: 990,
    image: expressoTradicionalImg,
    imageAlt: 'Xícara branca vista de cima com Expresso Tradicional e crema dourada',
  },
  {
    id: 'expresso-americano',
    name: 'Expresso Americano',
    description: 'Expresso diluído, menos intenso que o tradicional',
    tags: ['Tradicional'],
    priceInCents: 990,
    image: expressoAmericanoImg,
    imageAlt: 'Xícara branca vista de cima com Expresso Americano escuro',
  },
  {
    id: 'expresso-cremoso',
    name: 'Expresso Cremoso',
    description: 'Café expresso tradicional com espuma cremosa',
    tags: ['Tradicional'],
    priceInCents: 990,
    image: expressoCremosoImg,
    imageAlt: 'Xícara branca vista de cima com Expresso Cremoso de crema espessa',
  },
  {
    id: 'expresso-gelado',
    name: 'Expresso Gelado',
    description: 'Bebida preparada com café expresso e cubos de gelo',
    tags: ['Tradicional', 'Gelado'],
    priceInCents: 1090,
    image: expressoGeladoImg,
    imageAlt: 'Xícara branca vista de cima com Expresso Gelado e cubos de gelo',
  },
  {
    id: 'cafe-com-leite',
    name: 'Café com Leite',
    description: 'Meio a meio de expresso tradicional com leite vaporizado',
    tags: ['Tradicional', 'Com leite'],
    priceInCents: 1090,
    image: cafeComLeiteImg,
    imageAlt: 'Xícara branca vista de cima com Café com Leite cremoso',
  },
  {
    id: 'latte',
    name: 'Latte',
    description:
      'Uma dose de café expresso com o dobro de leite e espuma cremosa',
    tags: ['Tradicional', 'Com leite'],
    priceInCents: 1190,
    image: latteImg,
    imageAlt: 'Xícara branca vista de cima com Latte decorado com latte art',
  },
  {
    id: 'capuccino',
    name: 'Capuccino',
    description:
      'Bebida com canela feita de doses iguais de café, leite e espuma',
    tags: ['Tradicional', 'Com leite'],
    priceInCents: 1190,
    image: capuccinoImg,
    imageAlt: 'Xícara branca vista de cima com Capuccino polvilhado com canela',
  },
  {
    id: 'macchiato',
    name: 'Macchiato',
    description:
      'Café expresso misturado com um pouco de leite quente e espuma',
    tags: ['Tradicional', 'Com leite'],
    priceInCents: 1150,
    image: macchiatoImg,
    imageAlt: 'Xícara branca vista de cima com Macchiato e ponto central de espuma',
  },
  {
    id: 'mocaccino',
    name: 'Mocaccino',
    description: 'Café expresso com calda de chocolate, pouco leite e espuma',
    tags: ['Tradicional', 'Com leite'],
    priceInCents: 1290,
    image: mocaccinoImg,
    imageAlt: 'Xícara branca vista de cima com Mocaccino e espiral de chocolate',
  },
  {
    id: 'chocolate-quente',
    name: 'Chocolate Quente',
    description:
      'Bebida feita com chocolate dissolvido no leite quente e café',
    tags: ['Especial', 'Com leite'],
    priceInCents: 1290,
    image: chocolateQuenteImg,
    imageAlt: 'Xícara branca vista de cima com Chocolate Quente encorpado',
  },
  {
    id: 'cubano',
    name: 'Cubano',
    description:
      'Drink gelado de café expresso com rum, creme de leite e hortelã',
    tags: ['Especial', 'Alcoólico', 'Gelado'],
    priceInCents: 1490,
    image: cubanoImg,
    imageAlt: 'Xícara branca vista de cima com café Cubano gelado e folhas de hortelã',
  },
  {
    id: 'havaiano',
    name: 'Havaiano',
    description: 'Bebida adocicada preparada com café e leite de coco',
    tags: ['Especial'],
    priceInCents: 1350,
    image: havaianoImg,
    imageAlt: 'Xícara branca vista de cima com café Havaiano e flocos de coco',
  },
  {
    id: 'arabe',
    name: 'Árabe',
    description: 'Bebida preparada com grãos de café árabe e especiarias',
    tags: ['Especial'],
    priceInCents: 1390,
    image: arabeImg,
    imageAlt: 'Xícara branca vista de cima com café Árabe e especiarias',
  },
  {
    id: 'irlandes',
    name: 'Irlandês',
    description:
      'Bebida a base de café, uísque irlandês, açúcar e chantilly',
    tags: ['Especial', 'Alcoólico'],
    priceInCents: 1490,
    image: irlandesImg,
    imageAlt: 'Xícara branca vista de cima com café Irlandês coberto com chantilly',
  },
]
