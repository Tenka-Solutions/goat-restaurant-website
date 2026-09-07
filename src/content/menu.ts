import type { LocalizedText, MenuCategory, MenuItem } from "@/types/site";

const text = (en: string, es: string): LocalizedText => ({ en, es });
const item = (
  id: string,
  en: string,
  es: string,
  price?: string,
  description?: LocalizedText,
  provisional = false,
): MenuItem => ({ id, name: text(en, es), price, description, provisional });

// Prices and Spanish product copy are transcribed from docs/source-menu/G.O.A.T.pdf.
// English translations are editorial drafts. See docs/menu-content-review.md before launch.
export const menuCategories: MenuCategory[] = [
  {
    id: "appetizers",
    title: text("Appetizers", "Entradas"),
    description: text("To snack and share", "Para picar y compartir"),
    items: [
      item("beef-carpaccio", "Beef tenderloin carpaccio", "Carpaccio de lomo de res", "$17.99", text("Thin slices of tenderloin, seasoned and presented G.O.A.T. style.", "Finas láminas de lomo, sazonadas y presentadas al estilo G.O.A.T."), true),
      item("picada", "Simple picada", "Picada simple", "$17.99", text("Four cheeses, salami, prosciutto, nuts and bread.", "Selección de cuatro quesos, salame, jamón crudo, frutos secos y pan."), true),
      item("goat-salad", "G.O.A.T. salad", "Ensalada G.O.A.T.", "$15.99", text("Mixed greens, berries, hearts of palm, Parmesan and grilled beef.", "Mix de hojas verdes, berries, palmitos, queso parmesano y carne asada."), true),
      item("tongue-vinaigrette", "Tongue vinaigrette", "Lengua a la vinagreta", "$11.99", text("Thin cuts of beef tongue seasoned with vinegar and G.O.A.T. spices.", "Finos cortes de lengua de res, sazonados en vinagre y especias G.O.A.T."), true),
      item("choripapas", "Choripapas", "Choripapas", "$13.99", text("Sliced Argentine chorizo with roasted peppers and fries.", "Chorizo argentino laminado con pimientos asados y papas fritas."), true),
      item("spanish-tortilla", "Spanish tortilla", "Tortilla española", "$9.99", text("Thinly sliced layered potatoes with caramelized onion.", "Finas papas laminadas en capas, con cebolla caramelizada."), true),
    ],
  },
  {
    id: "empanadas",
    title: text("Empanadas", "Empanadas"),
    description: text("$3.49 each", "$3.49 cada una"),
    items: [
      item("empanada-cheese", "Cheese", "Queso", "$3.49 each", undefined, true),
      item("empanada-ham-cheese", "Ham & cheese", "Jamón y queso", "$3.49 each", undefined, true),
      item("empanada-shredded-beef-cheese", "Shredded beef & cheese", "Mechada y queso", "$3.49 each", undefined, true),
      item("empanada-beef", "Beef", "Carne", "$3.49 each", undefined, true),
      item("empanada-chicken", "Chicken", "Pollo", "$3.49 each", undefined, true),
      item("empanada-spinach-ricotta", "Spinach & ricotta", "Espinaca y ricotta", "$3.49 each", undefined, true),
      item("empanada-humita", "Humita", "Humita", "$3.49 each", undefined, true),
    ],
  },
  {
    id: "pizzas",
    title: text("Pizzas", "Pizzas"),
    items: [
      item("pizza-prosciutto", "Prosciutto, arugula & cherry tomato", "Jamón crudo, rúcula y tomate cherry", "$12", undefined, true),
      item("pizza-ham-blue-cheese", "Cooked ham & blue cheese", "Jamón cocido y queso azul", "$10", undefined, true),
      item("pizza-pepperoni", "Pepperoni", "Pepperoni", "$10"),
      item("pizza-veggies", "Veggies", "Veggies", "$10", text("Tomato, mushrooms, red onion, bell pepper and olives.", "Tomate, champiñones, cebolla roja, pimiento morrón y aceitunas."), true),
      item("pizza-extra-beef", "Extra beef", "Adicional carne", "$5"),
      item("pizza-extra-chicken", "Extra chicken", "Adicional pollo", "$3"),
      item("pizza-extra-chorizo", "Extra chorizo", "Adicional chorizo", "$3"),
      item("pizza-extra-bacon", "Extra bacon", "Adicional bacon", "$3"),
    ],
  },
  {
    id: "grilled-meats",
    title: text("Grilled meats", "Carnes a la parrilla"),
    description: text("All meats include one side.", "Todas las carnes incluyen un acompañamiento."),
    items: [
      item("ribeye", "Bife ancho (rib-eye)", "Bife ancho (RIB-EYES)", "$28", undefined, true),
      item("short-ribs", "Asado de tira (short ribs)", "Asado de tira (SHORT-RIBES)", "$26", undefined, true),
      item("skirt-steak", "Skirt steak", "Entraña", "$26", undefined, true),
      item("picanha", "Picanha", "Picaña", "$24", undefined, true),
    ],
  },
  {
    id: "milanese",
    title: text("Milanese", "Milanesas"),
    description: text("Beef or chicken · includes one side", "Carne o pollo · incluye un acompañamiento"),
    items: [
      item("milanese-napolitana", "Napolitana", "Napolitana", "$19.99", text("Sauce, ham, cheese and tomatoes.", "Salsa, jamón, queso y tomates."), true),
      item("milanese-spanish", "Spanish style", "A la española", "$18.99", text("Cheese, peppers and smoked chorizo.", "Queso, pimientos y chorizo ahumado."), true),
      item("milanese-horseback", "A caballo", "A caballo", "$17.99", text("Milanese with two fried eggs.", "Milanesa con dos huevos fritos."), true),
    ],
  },
  {
    id: "homemade-pasta",
    title: text("Homemade pasta", "Pastas hechas en casa"),
    description: text("Sauces: bolognese, marinara, Alfredo, pesto or mixed.", "Salsas: boloñesa, marinara, Alfredo, pesto o mixta."),
    items: [
      item("ravioli", "Ravioli", "Ravioles", "$18.99", text("Ask about the filling of the day.", "Preguntar por el relleno del día."), true),
      item("cannelloni", "Cannelloni", "Canelones", "$17.99", text("Beef or spinach.", "Carne o espinaca."), true),
      item("lasagna", "Bolognese lasagna", "Lasaña a la boloñesa", "$15.99", undefined, true),
      item("gnocchi", "Gnocchi", "Ñoquis", "$15.99", undefined, true),
      item("pasta-extra-shrimp", "Extra shrimp", "Adicional camarones", "$6"),
      item("pasta-extra-chicken", "Extra chicken", "Adicional pollo", "$5"),
    ],
  },
  {
    id: "seafood",
    title: text("Seafood", "Del mar"),
    items: [
      item("frutti-di-mare", "Frutti di mare", "Frutti di mare", "$23.99", text("Frutti di mare pasta.", "Pasta frutti di mare."), true),
      item("grilled-salmon", "Grilled salmon", "Salmón a la parrilla", "$21.99", text("Includes two sides.", "Incluye dos guarniciones."), true),
      item("garlic-shrimp", "Garlic shrimp", "Camarones al ajillo", "$18.99", text("Shrimp with garlic butter and fine herbs.", "Camarones con mantequilla al ajo y finas hierbas."), true),
      item("pacific-hake", "Pacific hake", "Merluza del Pacífico", "$17.99", text("Fried hake with two sides.", "Merluza frita con dos guarniciones."), true),
    ],
  },
  {
    id: "sides-salads",
    title: text("Sides & salads", "Guarniciones y ensaladas"),
    items: [
      item("fries", "French fries", "Papas fritas", "$3.99"),
      item("grilled-vegetables", "Grilled vegetables", "Parrilla de verduras", "$3.99"),
      item("mashed-potatoes", "Mashed potatoes", "Puré de papas", "$3.99"),
      item("creamed-corn", "Creamed corn", "Choclos a la crema", "$3.99", undefined, true),
      item("house-rice", "House rice", "Arroz de la casa", "$3.99"),
      item("country-salad", "Country salad", "Ensalada del campo", "$3.99", text("Lettuce, onion and tomato.", "Lechuga, cebolla y tomate."), true),
      item("house-salad", "House salad", "Ensalada de la casa", "$3.99", text("Mixed greens, hearts of palm and berries.", "Mix de verdes, palmitos y berries."), true),
      item("russian-salad", "Russian salad", "Ensalada rusa", "$3.99", text("Potatoes, mixed vegetables, boiled egg and mayonnaise.", "Papas, mix de verduras, huevo cocido y mayonesa."), true),
    ],
  },
  {
    id: "sandwiches",
    title: text("Sandwiches", "Sándwiches"),
    description: text("All sandwiches include house fries.", "Todos los sándwiches incluyen papas fritas de la casa."),
    items: [
      item("chivito", "Chivito", "Chivito", "$17.99", text("Beef, ham, cheese, bacon, egg, roasted pepper, lettuce, tomato, green olives, mayonnaise and mustard.", "Carne de res, jamón, queso, bacon, huevo, pimiento asado, lechuga, tomate, aceitunas verdes, mayonesa y mostaza."), true),
      item("lomito", "Lomito", "Lomito", "$16.99", text("Griddled tenderloin, cheese, ham, egg, mayonnaise, lettuce and tomato.", "Lomito a la plancha, queso, jamón, huevo, mayonesa, lechuga y tomate."), true),
      item("milanese-sandwich", "Milanese", "Milanesa", "$15.99", text("Milanese, mayonnaise, mustard, caramelized onion, lettuce and tomato.", "Milanesa, mayonesa, mostaza, cebolla caramelizada, lechuga y tomate."), true),
      item("choripan", "Choripán", "Choripán", "$12.99", text("Argentine chorizo with chimichurri and salsa criolla.", "Chorizo argentino con chimichurri y salsa criolla."), true),
    ],
  },
  {
    id: "burgers",
    title: text("Homemade burgers", "Hamburguesas caseras"),
    description: text("All burgers include house fries.", "Todas las hamburguesas incluyen papas fritas de la casa."),
    items: [
      item("goat-burger", "G.O.A.T.", "G.O.A.T.", "$17.99", text("Double burger, cheddar, chorizo, crispy onion, tomato, lettuce and G.O.A.T. sauce.", "Doble hamburguesa, queso cheddar, chorizo, cebolla crispy, tomate, lechuga y salsa G.O.A.T."), true),
      item("bacon-burger", "Bacon burger", "Bacon burger", "$14.99", text("Burger, cheddar, bacon, fried egg, tomato and lettuce.", "Hamburguesa, queso cheddar, bacon, huevo frito, tomate y lechuga."), true),
      item("cheddar-burger", "Cheddar", "Queso cheddar", "$11.99", text("Cheddar, tomato and lettuce.", "Queso cheddar, tomate y lechuga."), true),
    ],
  },
  {
    id: "tarts",
    title: text("Argentine tarts", "Tartas a la argentina"),
    items: [
      item("pascualina", "Pascualina", "Pascualina", "$12", text("Spinach, ricotta, onion and cheese.", "Espinaca, ricota, cebolla y queso."), true),
      item("ham-cheese-tart", "Ham & cheese", "Jamón y queso", "$12", text("Ham, cheese and cream.", "Jamón, queso y crema."), true),
      item("corn-onion-tart", "Corn & onion", "Choclo y cebolla", "$12", text("Corn, onion, cheese and cream.", "Choclo, cebolla, queso y crema."), true),
    ],
  },
  {
    id: "kids",
    title: text("Kids menu", "Menú niños"),
    items: [
      item("kids-pizza", "Kids pizza", "Pizza kids", "$5.99", text("Cheese or pepperoni.", "Queso o pepperoni."), true),
      item("kids-mac", "Mac & cheese", "Mac & cheese", "$4.99", text("Macaroni with cheese.", "Macarrones con queso."), true),
      item("kids-milanese", "Kids milanese", "Milanesa kids", "$6.99", text("Milanese with fries.", "Milanesa con papas fritas."), true),
      item("kids-skirt", "Kids skirt steak", "Entraña kids", "$11.99", text("4 oz skirt steak with fries.", "Entraña de 4 oz con papas fritas."), true),
    ],
  },
  {
    id: "desserts",
    title: text("Desserts", "Postres"),
    items: [
      item("flan", "Flan with dulce de leche", "Flan con dulce de leche", "$7"),
      item("vigilante", "Vigilante", "Vigilante", "$7", undefined, true),
      item("pastafrola", "Pastafrola", "Pastafrola", "$7", undefined, true),
      item("pancakes", "Crêpes with dulce de leche", "Panqueques con dulce de leche", "$7", undefined, true),
    ],
  },
  {
    id: "drinks",
    title: text("Drinks", "Bebidas"),
    items: [
      item("fountain", "Fountain drink", "Bebida de fuente", "$3.00", text("Coke, Fanta, Sprite, Dr Pepper or lemonade.", "Coke, Fanta, Sprite, Dr Pepper o limonada."), true),
      item("bottled-soda", "Bottled soda", "Bebida en botella", "$3.50", text("Coke, Fanta or Sprite.", "Coke, Fanta o Sprite."), true),
      item("mineral-water", "Mineral water", "Agua mineral", "$3.00"),
      item("bottled-water", "Bottled water", "Botella de agua", "$2.00"),
      item("natural-juice", "Natural juice", "Jugo natural", "$4.50", text("Pineapple-mint, horchata or raspberry lemonade.", "Piña-menta, horchata o limonada de raspberry."), true),
    ],
  },
  {
    id: "coffee-tea-mate",
    title: text("Coffee, tea & mate", "Café, té y mate"),
    items: [
      item("dulce-coffee", "Dulce de leche coffee", "Dulce de leche coffee", "$5.99", undefined, true),
      item("cappuccino", "Cappuccino", "Capuccino", "$5.99", undefined, true),
      item("mocha", "Mocaccino", "Mocaccino", "$4.99", undefined, true),
      item("latte", "Latte", "Late", "$4.99", undefined, true),
      item("americano", "Americano", "Americano", "$3.99"),
      item("espresso", "Espresso", "Expreso", "$3.99", undefined, true),
      item("black-tea", "Black tea", "Té negro", "$2.50"),
      item("chamomile", "Chamomile", "Manzanilla", "$2.50", undefined, true),
      item("mint-tea", "Mint", "Menta", "$2.50", undefined, true),
      item("mate-cocido", "Mate cocido", "Mate cocido", "$2.50", undefined, true),
      item("boldo-tea", "Boldo tea", "Té de boldo", "$2.50", undefined, true),
      item("green-tea", "Green tea", "Té verde", "$2.50"),
      item("mate-service", "Mate service", "Servicio de mates", "$5.99", text("Includes hot-water refills, yerba mate and sugar or sweetener.", "Incluye recargas de agua caliente, yerba mate y azúcar o endulzante."), true),
    ],
  },
];
