DROP table onlinestore.items;
DROP table onlinestore.users;
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

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
-- Name: onlinestore; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA onlinestore;


ALTER SCHEMA onlinestore OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: items; Type: TABLE; Schema: onlinestore; Owner: postgres
--

CREATE TABLE onlinestore.items (
    id_item integer NOT NULL,
    item_name character varying(25),
    type character varying(20),
    price numeric(10,2),
    quantity integer,
    input_date date,
    photo text
);


ALTER TABLE onlinestore.items OWNER TO postgres;

--
-- Name: items_id_item_seq; Type: SEQUENCE; Schema: onlinestore; Owner: postgres
--

CREATE SEQUENCE onlinestore.items_id_item_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE onlinestore.items_id_item_seq OWNER TO postgres;

--
-- Name: items_id_item_seq; Type: SEQUENCE OWNED BY; Schema: onlinestore; Owner: postgres
--

ALTER SEQUENCE onlinestore.items_id_item_seq OWNED BY onlinestore.items.id_item;


--
-- Name: users; Type: TABLE; Schema: onlinestore; Owner: postgres
--

CREATE TABLE onlinestore.users (
    user_id integer NOT NULL,
    type character varying(30),
    first_name character varying(50),
    last_name character varying(50),
    login character varying(50),
    password character varying(64),
    phone_number character varying(15),
    address character varying(255)
);


ALTER TABLE onlinestore.users OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: onlinestore; Owner: postgres
--

CREATE SEQUENCE onlinestore.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE onlinestore.users_user_id_seq OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: onlinestore; Owner: postgres
--

ALTER SEQUENCE onlinestore.users_user_id_seq OWNED BY onlinestore.users.user_id;


--
-- Name: items id_item; Type: DEFAULT; Schema: onlinestore; Owner: postgres
--

ALTER TABLE ONLY onlinestore.items ALTER COLUMN id_item SET DEFAULT nextval('onlinestore.items_id_item_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: onlinestore; Owner: postgres
--

ALTER TABLE ONLY onlinestore.users ALTER COLUMN user_id SET DEFAULT nextval('onlinestore.users_user_id_seq'::regclass);


--
-- Data for Name: items; Type: TABLE DATA; Schema: onlinestore; Owner: postgres
--

COPY onlinestore.items (id_item, item_name, type, price, quantity, input_date, photo) FROM stdin;
1	Chives	Vegetables	0.80	100	\N	\N ../../img/chives.jpeg
2	Yellow pepper	Vegetables	1.00	100	\N	\N ../../img/yellowPepper.jpeg
3	Cauliflower	Vegetables	0.90	100	\N	\N ../../img/cauliflower.jpeg
4	Rasberry tomato	Vegetables	0.2	100	\N	\N ../../img/rasberryTomato.jpeg
6	Cabbage	Vegetables	0.75	70	\N	\N ../../img/cabbage.jpeg
7	Kohlrabi 	Vegetables	0.3	120	\N	\N ../../img/kohlrabi.jpeg
8	Radish	Vegetables	0.10	150	\N	\N ../../img/radish.jpeg
9	Cherry tomato	Vegetables	0.20	100	\N	\N ../../img/cherryTomato.jpeg
10	Avocado	Vegetables	3.00	20	\N	\N ../../img/avocado.jpeg
11	Lettuce	Vegetables	1.00	60	\N	\N ../../img/lettuce.jpeg
12	Carrot	Vegetables	0.30	200	\N	\N ../../img/carrot.jpeg
13	Broccoli	Vegetables	1.50	40	\N	\N ../../img/broccoli.jpeg
14	Garlic	Vegetables	0.25	100	\N	\N ../../img/garlic.jpeg
15	Zucchini 	Vegetables	0.20	170	\N	\N ../../img/zucchini.jpeg
16	Valerianella	Vegetables	2.50	100	\N	\N ../../img/valerianella.jpeg
17	Spinach	Vegetables	2.50	100	\N	\N ../../img/spinach.jpeg
18	Rucola	Vegetables	2.50	100	\N	\N ../../img/rucola.jpeg
19	Onion	Vegetables	0.40	100	\N	\N ../../img/onion.jpeg
20	Celery	Vegetables	0.10	100	\N	\N ../../img/celery.jpeg
21	Dill	Vegetables	0.15	120	\N	\N ../../img/dill.jpeg
22	Parsley	Vegetables	0.15	100	\N	\N ../../img/parsley.jpeg
23	Red pepper	Vegetables	1.00	100	\N	\N ../../img/redPepper.jpeg
24	Cucumber	Vegetables	0.50	100	\N	\N ../../img/cucumber.jpeg
25	Tomato	Vegetables	0.15	100	\N	\N ../../img/tomato.jpeg
26	Mushroom	Vegetables	0.05	100	\N	\N ../../img/mushroom.jpeg
27	Beetroot	Vegetables	0.30	180	\N	\N ../../img/betroot.jpeg
28	Leek	Vegetables	0.68	100	\N	\N ../../img/leek.jpeg
29	Chili	Vegetables	0.50	100	\N	\N ../../img/sweetPotato.jpeg
30	Sweetcorn	Vegetables	1.30	100	\N	\N ../../img/sweetcorn.jpeg
31	Aubergine	Vegetables	2.00	40	\N	\N ../../img/aubergine.jpeg
32	Red cabbage	Vegetables	0.75	100	\N	\N ../../img/redCabbage.jpeg
33	Soya	Vegetables	1.00	100	\N	\N ../../img/soya.jpeg
34	Asparagus	Vegetables	2.00	100	\N	\N ../../img/aspargus.jpeg
35	Kale	Vegetables	0.7	100	\N	\N ../../img/kale.jpeg
36	Turnip	Vegetables	0.8	100	\N	\N ../../img/turnip.jpeg
37	Sweet potato	Vegetables	1.50	100	\N	\N ../../img/sweetPotato.jpeg
5	Potato	Vegetables	0.15	100	\N	../../img/potato.jpeg
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: onlinestore; Owner: postgres
--

COPY onlinestore.users (user_id, type, first_name, last_name, login, password, phone_number, address) FROM stdin;
1	administrator	\N	\N	admin@veggiestore.app	080fa5958e45a4533ba4abe205af7bc83f23efb400f639e668c103624f3cc59d	\N	\N
\.


--
-- Name: items_id_item_seq; Type: SEQUENCE SET; Schema: onlinestore; Owner: postgres
--

SELECT pg_catalog.setval('onlinestore.items_id_item_seq', 37, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: onlinestore; Owner: postgres
--

SELECT pg_catalog.setval('onlinestore.users_user_id_seq', 1, true);


--
-- Name: items items_pkey; Type: CONSTRAINT; Schema: onlinestore; Owner: postgres
--

ALTER TABLE ONLY onlinestore.items
    ADD CONSTRAINT items_pkey PRIMARY KEY (id_item);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: onlinestore; Owner: postgres
--

ALTER TABLE ONLY onlinestore.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- PostgreSQL database dump complete
--

