DROP table onlinestore.items;
DROP table onlinestore.users;

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

SET default_tablespace = '';

SET default_table_access_method = heap;


CREATE SCHEMA onlinestore;

--
-- Name: items; Type: TABLE; Schema: onlinestore; Owner: postgres
--

CREATE TABLE onlinestore.items (
    id_item integer NOT NULL,
    item_name character varying(25),
    type character varying(20),
    price numeric(10,2),
    quantity integer,
    input_date date
);


ALTER TABLE onlinestore.items OWNER TO postgres;

--
-- Name: items_id_item_seq; Type: SEQUENCE; Schema: onlinestore; Owner: postgres
--

CREATE SEQUENCE onlinestore.items_id_item_seq
    AS integer
    START WITH 1000
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
-- Name: items id_item; Type: DEFAULT; Schema: onlinestore; Owner: postgres
--

ALTER TABLE ONLY onlinestore.items ALTER COLUMN id_item SET DEFAULT nextval('onlinestore.items_id_item_seq'::regclass);


--
-- Data for Name: items; Type: TABLE DATA; Schema: onlinestore; Owner: postgres
--

COPY onlinestore.items (id_item, item_name, type, price, quantity, input_date) FROM stdin;
38	Chives	Vegetables	\N	\N	\N
39	Yellow pepper	Vegetables	\N	\N	\N
40	Cauliflower	Vegetables	\N	\N	\N
41	Rasberry tomato	Vegetables	\N	\N	\N
42	Potato	Vegetables	\N	\N	\N
43	Cabbage	Vegetables	\N	\N	\N
44	Kohlrabi 	Vegetables	\N	\N	\N
45	Radish	Vegetables	\N	\N	\N
46	Cherry tomato	Vegetables	\N	\N	\N
47	Avocado	Vegetables	\N	\N	\N
48	Iceberg lettuce	Vegetables	\N	\N	\N
49	Carrot	Vegetables	\N	\N	\N
50	Broccoli	Vegetables	\N	\N	\N
51	Garlic	Vegetables	\N	\N	\N
52	Zucchini 	Vegetables	\N	\N	\N
53	Valerianella	Vegetables	\N	\N	\N
54	Spinach	Vegetables	\N	\N	\N
55	Rucola	Vegetables	\N	\N	\N
56	Onion	Vegetables	\N	\N	\N
57	Celery	Vegetables	\N	\N	\N
58	Dill	Vegetables	\N	\N	\N
59	Parsley	Vegetables	\N	\N	\N
60	Red pepper	Vegetables	\N	\N	\N
61	Cucomber	Vegetables	\N	\N	\N
62	Tomato	Vegetables	\N	\N	\N
63	Mushroom	Vegetables	\N	\N	\N
64	Beetroot	Vegetables	\N	\N	\N
65	Leek	Vegetables	\N	\N	\N
66	Chili	Vegetables	\N	\N	\N
67	Sweetcorn	Vegetables	\N	\N	\N
68	Aubergine	Vegetables	\N	\N	\N
69	Red cabbage	Vegetables	\N	\N	\N
70	Soya	Vegetables	\N	\N	\N
71	Asparagus	Vegetables	\N	\N	\N
72	Kale	Vegetables	\N	\N	\N
73	Turnip	Vegetables	\N	\N	\N
74	Sweet potato	Vegetables	\N	\N	\N
\.


--
-- Name: items_id_item_seq; Type: SEQUENCE SET; Schema: onlinestore; Owner: postgres
--

SELECT pg_catalog.setval('onlinestore.items_id_item_seq', 74, true);


--
-- Name: items items_pkey; Type: CONSTRAINT; Schema: onlinestore; Owner: postgres
--

ALTER TABLE ONLY onlinestore.items
    ADD CONSTRAINT items_pkey PRIMARY KEY (id_item);


--
-- PostgreSQL database dump complete
--

