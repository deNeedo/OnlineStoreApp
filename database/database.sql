DROP TABLE veggiestore.items;
DROP TABLE veggiestore.users;

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
    photo text
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

COPY veggiestore.items (id_item, item_name, type, price, quantity, input_date, photo) FROM stdin;
1	Chives	Vegetables	0.80	0	\N	N ../../img/chives.jpeg
2	Yellow pepper	Vegetables	1.00	100	\N	N ../../img/yellowPepper.jpeg
3	Cauliflower	Vegetables	0.90	100	\N	N ../../img/cauliflower.jpeg
4	Rasberry tomato	Vegetables	0.20	100	\N	N ../../img/rasberryTomato.jpeg
5	Potato	Vegetables	0.15	100	\N	../../img/potato.jpeg
6	Cabbage	Vegetables	0.75	70	\N	N ../../img/cabbage.jpeg
7	Kohlrabi 	Vegetables	0.30	120	\N	N ../../img/kohlrabi.jpeg
8	Radish	Vegetables	0.10	150	\N	N ../../img/radish.jpeg
9	Cherry tomato	Vegetables	0.20	100	\N	N ../../img/cherryTomato.jpeg
10	Avocado	Vegetables	3.00	20	\N	N ../../img/avocado.jpeg
11	Lettuce	Vegetables	1.00	60	\N	N ../../img/lettuce.jpeg
12	Carrot	Vegetables	0.30	200	\N	N ../../img/carrot.jpeg
13	Broccoli	Vegetables	1.50	40	\N	N ../../img/broccoli.jpeg
14	Garlic	Vegetables	0.25	100	\N	N ../../img/garlic.jpeg
15	Zucchini 	Vegetables	0.20	170	\N	N ../../img/zucchini.jpeg
16	Valerianella	Vegetables	2.50	100	\N	N ../../img/valerianella.jpeg
17	Spinach	Vegetables	2.50	100	\N	N ../../img/spinach.jpeg
18	Rucola	Vegetables	2.50	100	\N	N ../../img/rucola.jpeg
19	Onion	Vegetables	0.40	100	\N	N ../../img/onion.jpeg
20	Celery	Vegetables	0.10	100	\N	N ../../img/celery.jpeg
21	Dill	Vegetables	0.15	120	\N	N ../../img/dill.jpeg
22	Parsley	Vegetables	0.15	100	\N	N ../../img/parsley.jpeg
23	Red pepper	Vegetables	1.00	100	\N	N ../../img/redPepper.jpeg
24	Cucumber	Vegetables	0.50	100	\N	N ../../img/cucumber.jpeg
25	Tomato	Vegetables	0.15	100	\N	N ../../img/tomato.jpeg
26	Mushroom	Vegetables	0.05	100	\N	N ../../img/mushroom.jpeg
27	Beetroot	Vegetables	0.30	180	\N	N ../../img/betroot.jpeg
28	Leek	Vegetables	0.68	100	\N	N ../../img/leek.jpeg
29	Chili	Vegetables	0.50	100	\N	N ../../img/sweetPotato.jpeg
30	Sweetcorn	Vegetables	1.30	100	\N	N ../../img/sweetcorn.jpeg
31	Aubergine	Vegetables	2.00	40	\N	N ../../img/aubergine.jpeg
32	Red cabbage	Vegetables	0.75	100	\N	N ../../img/redCabbage.jpeg
33	Soya	Vegetables	1.00	100	\N	N ../../img/soya.jpeg
34	Asparagus	Vegetables	2.00	100	\N	N ../../img/aspargus.jpeg
35	Kale	Vegetables	0.70	100	\N	N ../../img/kale.jpeg
36	Turnip	Vegetables	0.80	100	\N	N ../../img/turnip.jpeg
37	Sweet potato	Vegetables	1.50	100	\N	N ../../img/sweetPotato.jpeg 
38	Apple	Fruit	0.20	120	\N	../../img/apple.jpeg
39	Banana	Fruit	0.20	130	\N	../../img/banana.jpeg
40	Pear	Fruit	0.20	130	\N	../../img/pear.jpeg
41	Rasberry	Fruit	2.30	0	\N	../../img/rasberry.jpeg
42	Strawberry	Fruit	3.00	10	\N	../../img/strawberry.jpeg
43	Kiwi	Fruit	0.50	30	\N	../../img/kiwi.jpeg
44	Orange	Fruit	0.10	50	\N	../../img/orange.jpeg
45	Grapefruit	Fruit	0.10	50	\N	../../img/grapefruit.jpeg
46	Peach	Fruit	0.15	40	\N	../../img/peach.jpeg
47	Cherry	Fruit	1.00	15	\N	../../img/cherry.jpeg
48	Plum	Fruit	0.05	600	\N	../../img/plum.jpeg
49	Coconut	Fruit	1.80	10	\N	../../img/coconut.jpeg
50	Blackberry	Fruit	2.50	20	\N	../../img/blackberry.jpeg
51	Mango	Fruit	1.20	40	\N	../../img/mango.jpeg
52	Pineapple	Fruit	2.50	17	\N	../../img/pineapple.jpeg
53	Watermelon	Fruit	3.00	15	\N	../../img/watermelon.jpeg
54	Grape	Fruit	2.30	20	\N	../../img/grape.jpeg
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

