export interface Recipe {
  id: string;
  title: string;
  emoji: string;
  calories: number;
  time: string;
  ingredients: string[];
  instructions: string;
}

export const sweetRecipes: Recipe[] = [
  {
    id: "1",
    title: "Brownie Fudge Keto",
    emoji: "🍫",
    calories: 120,
    time: "25 min",
    ingredients: ["1 taza de harina de almendras", "1/4 taza de cacao en polvo puro", "3 cucharadas de eritritol", "2 huevos", "1/4 taza de aceite de coco", "1 cucharadita de vainilla"],
    instructions: "Mezcla los ingredientes secos. Añade los húmedos y bate bien. Vierte en molde engrasado y hornea a 180°C por 18 minutos. Deja enfriar antes de cortar."
  },
  {
    id: "2",
    title: "Helado Rápido de Fresa",
    emoji: "🍧",
    calories: 95,
    time: "5 min",
    ingredients: ["2 tazas de fresas congeladas", "1/2 taza de leche de almendras", "2 cucharadas de crema de leche espesa", "Stevia al gusto"],
    instructions: "Licúa todos los ingredientes a velocidad alta en un procesador hasta obtener una textura cremosa. Sirve de inmediato."
  },
  {
    id: "3",
    title: "Galletas Choco-Chips",
    emoji: "🍪",
    calories: 85,
    time: "15 min",
    ingredients: ["1 taza de harina de almendras", "1 de mantequilla derretida", "1 huevo", "Chispas de chocolate >85% cacao", "Stevia"],
    instructions: "Forma una masa con todos los ingredientes. Haz bolitas y aplástalas en una bandeja para horno. Hornea por 12 mins a 170°C."
  },
  {
    id: "4",
    title: "Cheesecake en Vaso",
    emoji: "🍰",
    calories: 180,
    time: "10 min",
    ingredients: ["100g de queso crema limpio", "Eritritol o stevia", "1 cucharada de jugo de limón", "Frambuesas frescas", "Nueces molidas base"],
    instructions: "Bate el queso con el edulcorante y limón. Coloca las nueces al fondo de un vaso corto, añade la crema y corona con las frambuesas. Refrigera."
  },
  {
    id: "5",
    title: "Trufas de Coco Oscuro",
    emoji: "🥥",
    calories: 60,
    time: "10 min",
    ingredients: ["1 taza de coco rallado sin azúcar", "3 cucharadas de cacao oscuro", "2 cdtas de aceite de coco líquido", "Stevia"],
    instructions: "Mezcla todo. Compacta la masa con las manos formando pequeñas esferas. Mételas al refrigerador 1 hora antes de comer."
  },
  {
    id: "6",
    title: "Tiramisu Low Carb",
    emoji: "🍮",
    calories: 150,
    time: "20 min",
    ingredients: ["Biscochos cetogénicos o base de harina de coco", "1 espresso fuerte", "Queso mascarpone", "Eritritol", "Cacao en polvo"],
    instructions: "Empapa galletas o un bizcocho keto en café sin azúcar. Cubre con mascarpone batido. Repite capas y tamiza cacao encima."
  },
  {
    id: "7",
    title: "Mousse de Limón Ligero",
    emoji: "🍋",
    calories: 110,
    time: "5 min",
    ingredients: ["1 taza de crema para batir fresca", "Jugo de 2 limones", "Zest (Ralladura) de limón", "Endulzante natural"],
    instructions: "Bate la crema muy fría a punto de nieve con edulcorante, ralla la piel y exprime limones. Bate un poco más y al vaso frío."
  },
  {
    id: "8",
    title: "Muffins de Arándanos",
    emoji: "🧁",
    calories: 130,
    time: "25 min",
    ingredients: ["2 de almendra molida", "3 huevos", "1 puñado de arándanos frescos", "Polvo de hornear", "Leche de coco"],
    instructions: "Haz la mezcla, envuelve suave los arándanos enteros, llena capacillos 3/4 y hornea 20 minutos. El olor te enamorará."
  },
  {
    id: "9",
    title: "Bombones Congelados Mantequilla Maní",
    emoji: "🥜",
    calories: 90,
    time: "10 min",
    ingredients: ["Mantequilla de maní o cacahuate (sólo maní en el envase)", "Aceite de coco", "Cacao puro"],
    instructions: "Derrite el chocolate/cacao con aceite de coco. Llena moldes de hielo por la mitad. Añade punto de crema de maní y sella con cacao. Congela."
  },
  {
    id: "10",
    title: "Panqueques Nube Dulces",
    emoji: "🥞",
    calories: 100,
    time: "10 min",
    ingredients: ["2 huevos (separados)", "2 cucharadas de queso crema", "Vainilla", "Stevia", "Canela"],
    instructions: "Bata claras a punto de nieve. Bate yemas y queso. Mezcla envolviendo fuerte. Pon círculos dorados en sartén."
  },
  {
    id: "11",
    title: "Rollitos Dulces de Canela Keto",
    emoji: "🍥",
    calories: 160,
    time: "30 min",
    ingredients: ["Masa mozzarella o fathead", "Mantequilla ghee", "Mucha canela", "Eritritol", "Crema para glaseado"],
    instructions: "Estira la masa plana, pinta con abundante ghee, canela y endulzante, enrolla y corta. Hornea hasta que broten dorados y deliciosos."
  },
  {
    id: "12",
    title: "Pudin de Chía Nocturno",
    emoji: "🥣",
    calories: 155,
    time: "5 min",
    ingredients: ["3 cdts de Chía", "1 Taza Leche de coco / almendras", "Esencia sabor coco", "Frambuesas"],
    instructions: "Mézclalo muy bien en un frasco de vidrio, sella. Déjalo en el refrigerador toda la noche. Absorberá perfecto y gelificará."
  },
  {
    id: "13",
    title: "Crepas Rellenas Zero",
    emoji: "🌯",
    calories: 120,
    time: "15 min",
    ingredients: ["Huevos base", "Harina de lino 1 cdta", "Queso crema para relleno", "Fresas picaditas"],
    instructions: "Cocina la textura líquida súper finita en la plancha teflón. Rellénala con queso y fresa y decora como postre fino."
  },
  {
    id: "14",
    title: "Batido Exótico Mango Fake",
    emoji: "🍹",
    calories: 85,
    time: "2 min",
    ingredients: ["Leche almendras", "Trozos pequeños de durazno/piña low fructose con saborizante artificial liso", "Stevia stevita"],
    instructions: "Agitar brutalmente en un batidor con hielo. Listo en 30 segundos te salva de la sed y el deseo brutal por azúcar."
  },
  {
    id: "15",
    title: "Gomitas de Colágeno Dieta",
    emoji: "🍬",
    calories: 30,
    time: "5 min",
    ingredients: ["Gelatina sabor rojo (sin azúcar)", "1 sachet colágeno puro", "Agua muy caliente"],
    instructions: "Simplemente diluye en mínima agua logrando mucha concentración. Vierte en moldes gomita y en 3 horas son caramelos de masticar."
  },
  {
    id: "16",
    title: "Flan Clásico sin Pecado",
    emoji: "🍮",
    calories: 140,
    time: "40 min",
    ingredients: ["3 huevos", "Leche entera de coco o pesada", "Vainilla Real", "Para el caramelo: Eritritol tostado"],
    instructions: "Haz caramelo falso y ponlo en bowl de flan. Luego vierte la mezcla cremosa batida y hornea en baño maría (horno cerrado calmo)."
  },
  {
    id: "17",
    title: "Chips Dulces de Coco al Horno",
    emoji: "🥥",
    calories: 70,
    time: "10 min",
    ingredients: ["Láminas enormes de coco natural", "Canela en polvo"],
    instructions: "Extiende láminas largas de coco gruesas, espolvorea canela. Tuesta rápido (10 min). Estarán ultra crocantes y saciantes."
  },
  {
    id: "18",
    title: "Brownie Taza (Mugcake) 90 seg",
    emoji: "☕",
    calories: 165,
    time: "2 min",
    ingredients: ["1 huevo", "1 cucharada de harina de almendra", "1 cacao fuerte", "mantequilla", "Polvo de hornear"],
    instructions: "Bate directo adentro de tu taza favorita, microondas a top potencia por 90 segundos exactos. Sube gigante."
  },
  {
    id: "19",
    title: "Barras Heladas Yogurt Frutos Rojos",
    emoji: "🏔️",
    calories: 110,
    time: "5 min",
    ingredients: ["Yogurt Griego verdadero puro (cero sugar)", "Mix berries", "Trozos de macadamia"],
    instructions: "Unta yogurt grueso en placa plana (papel plata), arroja berries y nuez. Congele horas. Rómpelo en pedazos crujientes mágicos."
  },
  {
    id: "20",
    title: "Magdalenas Ligeras Cítricas",
    emoji: "🍋",
    calories: 105,
    time: "20 min",
    ingredients: ["Base harina coco 1 taza", "3 huevos enormes libres", "Limón o Naranja esencia", "Leche"],
    instructions: "Combina batidos líquidos junto los secos con rapidez. La harina de coco seca rápido así que hidrátala y hornea enseguida."
  },
  {
    id: "21",
    title: "Chocolate Cortado a la Sal",
    emoji: "🍫",
    calories: 80,
    time: "5 min",
    ingredients: ["Barra %90 cacao puro absoluto", "Sal marina gruesa o rosa gruesa", "Gotas stevia encima"],
    instructions: "Derretir. Verter plano. Lanzar la sal rosa grande encima, secar refrigerando. Romper con puñal: contraste intenso gourmet."
  },
  {
    id: "22",
    title: "Dulce de Leche Ketogénico",
    emoji: "🍯",
    calories: 90,
    time: "15 min",
    ingredients: ["Crema de leche batir/fresca y grasa (Heavy cream)", "Eritritol mucho amarrado", "Mantequilla real", "Esencia caramelo ideal"],
    instructions: "Hierve removiendo con locura e infatigablemente hasta que la crema se reduzca y el eritritol dore. Cuida de no quemar. Ganas untura real."
  },
  {
    id: "23",
    title: "Tartaleta Fresca Kiwi-Coco",
    emoji: "🥝",
    calories: 170,
    time: "20 min",
    ingredients: ["Macadamias / Nueces cortantes picadas", "Agente untable (queso)", "Kiwis bellos ácidos", "Sweet puro"],
    instructions: "Prensar los frutos secos armando copa/base. Untar queso dulcito rápido. Adornar artísticamente con tajadas kiwi vibrantes."
  },
  {
    id: "24",
    title: "Helado Mágico Pistacho Fáscil",
    emoji: "🍧",
    calories: 180,
    time: "10 min",
    ingredients: ["Pistachos verdosos molidos crema", "Aguacate mediano (el secreto cremoso magno)", "Crema almendras", "Toda la Stevia necesaria"],
    instructions: "El paladar se asusta con aguacate pero es mago para la textura helada. Licúa hasta verde hermoso. Congela y bátelo ocasional."
  },
  {
    id: "25",
    title: "Volcán Fuego Chocolate",
    emoji: "🌋",
    calories: 190,
    time: "12 min",
    ingredients: ["100g de mantequilla", "120g de cacao sólido oscuro", "Endulzante granulado", "3 yemas liquidas"],
    instructions: "Fórmula de pastelería precisa: Derrites oscuro, bates gema. Horno fuerte altísimo temperatura y sacas cuando centro sigue líquido movible."
  },
];
