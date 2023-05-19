DROP TABLE veggiestore.items;
DROP TABLE veggiestore.sessions;
DROP TABLE veggiestore.users;
DROP SCHEMA veggiestore;

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: veggiestore; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA veggiestore;


ALTER SCHEMA veggiestore OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: items; Type: TABLE; Schema: veggiestore; Owner: postgres
--

CREATE TABLE veggiestore.items (
    id_item integer NOT NULL,
    item_name character varying(25),
    type character varying(20),
    price numeric(10,2),
    quantity integer,
    input_date date,
    photo text,
    polish_name character varying(40)
);


ALTER TABLE veggiestore.items OWNER TO postgres;

--
-- Name: items_id_item_seq; Type: SEQUENCE; Schema: veggiestore; Owner: postgres
--

CREATE SEQUENCE veggiestore.items_id_item_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE veggiestore.items_id_item_seq OWNER TO postgres;

--
-- Name: items_id_item_seq; Type: SEQUENCE OWNED BY; Schema: veggiestore; Owner: postgres
--

ALTER SEQUENCE veggiestore.items_id_item_seq OWNED BY veggiestore.items.id_item;


--
-- Name: sessions; Type: TABLE; Schema: veggiestore; Owner: postgres
--

CREATE TABLE veggiestore.sessions (
    id_session integer NOT NULL,
    login character varying(50),
    expire_time character varying(20)
);


ALTER TABLE veggiestore.sessions OWNER TO postgres;

--
-- Name: sessions_id_session_seq; Type: SEQUENCE; Schema: veggiestore; Owner: postgres
--

CREATE SEQUENCE veggiestore.sessions_id_session_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE veggiestore.sessions_id_session_seq OWNER TO postgres;

--
-- Name: sessions_id_session_seq; Type: SEQUENCE OWNED BY; Schema: veggiestore; Owner: postgres
--

ALTER SEQUENCE veggiestore.sessions_id_session_seq OWNED BY veggiestore.sessions.id_session;


--
-- Name: users; Type: TABLE; Schema: veggiestore; Owner: postgres
--

CREATE TABLE veggiestore.users (
    user_id integer NOT NULL,
    type character varying(30),
    first_name character varying(50),
    last_name character varying(50),
    login character varying(50),
    password character varying(64),
    phone_number character varying(15),
    address character varying(255)
);


ALTER TABLE veggiestore.users OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: veggiestore; Owner: postgres
--

CREATE SEQUENCE veggiestore.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE veggiestore.users_user_id_seq OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: veggiestore; Owner: postgres
--

ALTER SEQUENCE veggiestore.users_user_id_seq OWNED BY veggiestore.users.user_id;


--
-- Name: items id_item; Type: DEFAULT; Schema: veggiestore; Owner: postgres
--

ALTER TABLE ONLY veggiestore.items ALTER COLUMN id_item SET DEFAULT nextval('veggiestore.items_id_item_seq'::regclass);


--
-- Name: sessions id_session; Type: DEFAULT; Schema: veggiestore; Owner: postgres
--

ALTER TABLE ONLY veggiestore.sessions ALTER COLUMN id_session SET DEFAULT nextval('veggiestore.sessions_id_session_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: veggiestore; Owner: postgres
--

ALTER TABLE ONLY veggiestore.users ALTER COLUMN user_id SET DEFAULT nextval('veggiestore.users_user_id_seq'::regclass);


--
-- Data for Name: items; Type: TABLE DATA; Schema: veggiestore; Owner: postgres
--

COPY veggiestore.items (id_item, item_name, type, price, quantity, input_date, photo, polish_name) FROM stdin;
1	Chives	Vegetable	0.80	0	\N	N ../../img/chives.jpeg	Szczypiorek
2	Yellow pepper	Vegetable	1.00	100	\N	N ../../img/yellowPepper.jpeg	Papryka zółta
3	Cauliflower	Vegetable	0.90	100	\N	N ../../img/cauliflower.jpeg	Kalafior
4	Rasberry tomato	Vegetable	0.20	100	\N	N ../../img/rasberryTomato.jpeg	Pomidor malinowy
5	Potato	Vegetable	0.15	100	\N	../../img/potato.jpeg	Ziemniak
6	Cabbage	Vegetable	0.75	70	\N	N ../../img/cabbage.jpeg	Kapusta
7	Kohlrabi 	Vegetable	0.30	120	\N	N ../../img/kohlrabi.jpeg	Kalarepa
8	Radish	Vegetable	0.10	150	\N	N ../../img/radish.jpeg	Rzodkiewka
10	Avocado	Vegetable	3.00	20	\N	N ../../img/avocado.jpeg	Awokado
9	Cherry tomato	Vegetable	0.20	100	\N	N ../../img/cherryTomato.jpeg	Pomidorki koktajlowe
11	Lettuce	Vegetable	1.00	60	\N	N ../../img/lettuce.jpeg	Salata
12	Carrot	Vegetable	0.30	200	\N	N ../../img/carrot.jpeg	Marchewka
13	Broccoli	Vegetable	1.50	40	\N	N ../../img/broccoli.jpeg	Brokuł
14	Garlic	Vegetable	0.25	100	\N	N ../../img/garlic.jpeg	Czosnek
15	Zucchini 	Vegetable	0.20	170	\N	N ../../img/zucchini.jpeg	Cukinia
16	Valerianella	Vegetable	2.50	100	\N	N ../../img/valerianella.jpeg	Rukola
17	Spinach	Vegetable	2.50	100	\N	N ../../img/spinach.jpeg	Szpinka
18	Rucola	Vegetable	2.50	100	\N	N ../../img/rucola.jpeg	Rukola
19	Onion	Vegetable	0.40	100	\N	N ../../img/onion.jpeg	Cebula
20	Celery	Vegetable	0.10	100	\N	N ../../img/celery.jpeg	Seler
21	Dill	Vegetable	0.15	120	\N	N ../../img/dill.jpeg	Koperek
22	Parsley	Vegetable	0.15	100	\N	N ../../img/parsley.jpeg	Pietruszka
23	Red pepper	Vegetable	1.00	100	\N	N ../../img/redPepper.jpeg	Czerwona Papryka
24	Cucumber	Vegetable	0.50	100	\N	N ../../img/cucumber.jpeg	Ogórek zielony
25	Tomato	Vegetable	0.15	100	\N	N ../../img/tomato.jpeg	Pomidor
26	Mushroom	Vegetable	0.05	100	\N	N ../../img/mushroom.jpeg	Pieczarka
27	Beetroot	Vegetable	0.30	180	\N	N ../../img/betroot.jpeg	Burak
28	Leek	Vegetable	0.68	100	\N	N ../../img/leek.jpeg	Por
29	Chili	Vegetable	0.50	100	\N	N ../../img/chili.jpeg	Chili
30	Sweetcorn	Vegetable	1.30	100	\N	N ../../img/sweetcorn.jpeg	Kukurydza
31	Aubergine	Vegetable	2.00	40	\N	N ../../img/aubergine.jpeg	Baklażan
32	Red cabbage	Vegetable	0.75	100	\N	N ../../img/redCabbage.jpeg	Czerwona Kapusta
33	Soya	Vegetable	1.00	100	\N	N ../../img/soya.jpeg	Soja
34	Asparagus	Vegetable	2.00	100	\N	N ../../img/aspargus.jpeg	Szparagi
35	Kale	Vegetable	0.70	100	\N	N ../../img/kale.jpeg	Jarmuż
36	Turnip	Vegetable	0.80	100	\N	N ../../img/turnip.jpeg	Kalarepa
40	Pear	Fruit	0.20	130	\N	../../img/pear.jpeg	Gruszka
37	Sweet potato	Vegetable	1.50	100	\N	N ../../img/sweetPotato.jpeg 	Batat
38	Apple	Fruit	0.20	120	\N	../../img/apple.jpeg	Jabłko
39	Banana	Fruit	0.20	130	\N	../../img/banana.jpeg	Banan
41	Rasberry	Fruit	2.30	0	\N	../../img/rasberry.jpeg	Malina
42	Strawberry	Fruit	3.00	10	\N	../../img/strawberry.jpeg	Polska truskawka
43	Kiwi	Fruit	0.50	30	\N	../../img/kiwi.jpeg	Kiwi
44	Orange	Fruit	0.10	50	\N	../../img/orange.jpeg	Pomarańcz
45	Grapefruit	Fruit	0.10	50	\N	../../img/grapefruit.jpeg	Grejpfrut
46	Peach	Fruit	0.15	40	\N	../../img/peach.jpeg	Brzoskwinia
47	Cherry	Fruit	1.00	15	\N	../../img/cherry.jpeg	Wiśnia
48	Plum	Fruit	0.05	600	\N	../../img/plum.jpeg	Śliwka
49	Coconut	Fruit	1.80	10	\N	../../img/coconut.jpeg	Kokos
50	Blackberry	Fruit	2.50	20	\N	../../img/blackberry.jpeg	Czarna porzeczka
51	Mango	Fruit	1.20	40	\N	../../img/mango.jpeg	Mango
52	Pineapple	Fruit	2.50	17	\N	../../img/pineapple.jpeg	Ananas
53	Watermelon	Fruit	3.00	15	\N	../../img/watermelon.jpeg	Arbuz
54	Grape	Fruit	2.30	20	\N	../../img/grape.jpeg	Winogrono
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: veggiestore; Owner: postgres
--

COPY veggiestore.sessions (id_session, login, expire_time) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: veggiestore; Owner: postgres
--

COPY veggiestore.users (user_id, type, first_name, last_name, login, password, phone_number, address) FROM stdin;
1	administrator	\N	\N	admin@veggiestore.app	080fa5958e45a4533ba4abe205af7bc83f23efb400f639e668c103624f3cc59d	\N	\N
\.


--
-- Name: items_id_item_seq; Type: SEQUENCE SET; Schema: veggiestore; Owner: postgres
--

SELECT pg_catalog.setval('veggiestore.items_id_item_seq', 54, true);


--
-- Name: sessions_id_session_seq; Type: SEQUENCE SET; Schema: veggiestore; Owner: postgres
--

SELECT pg_catalog.setval('veggiestore.sessions_id_session_seq', 1, false);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: veggiestore; Owner: postgres
--

SELECT pg_catalog.setval('veggiestore.users_user_id_seq', 1, true);


--
-- Name: items items_pkey; Type: CONSTRAINT; Schema: veggiestore; Owner: postgres
--

ALTER TABLE ONLY veggiestore.items
    ADD CONSTRAINT items_pkey PRIMARY KEY (id_item);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: veggiestore; Owner: postgres
--

ALTER TABLE ONLY veggiestore.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id_session);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: veggiestore; Owner: postgres
--

ALTER TABLE ONLY veggiestore.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- PostgreSQL database dump complete
--

