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
    input_date date
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

COPY onlinestore.items (id_item, item_name, type, price, quantity, input_date) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: onlinestore; Owner: postgres
--

COPY onlinestore.users (user_id, type, first_name, last_name, login, password, phone_number, address) FROM stdin;
1	administrator	\N	\N	admin@onlinestore.app	fb01b886c430381fbc115a79ae9623a98d21750246b5a4b745c783a8a744896e	\N	\N
\.


--
-- Name: items_id_item_seq; Type: SEQUENCE SET; Schema: onlinestore; Owner: postgres
--

SELECT pg_catalog.setval('onlinestore.items_id_item_seq', 1, false);


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

