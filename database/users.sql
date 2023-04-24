DROP TABLE onlinestore.users;

CREATE SCHEMA onlinestore;
--
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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: users; Type: TABLE; Schema: onlinestore; Owner: postgres
--

CREATE TABLE onlinestore.users (
    user_id integer NOT NULL,
    type character varying(50),
    first_name character varying(50),
    last_name character varying(50),
    login character varying(50),
    password character varying(50),
    phone_number character varying(11),
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
-- Name: users user_id; Type: DEFAULT; Schema: onlinestore; Owner: postgres
--

ALTER TABLE ONLY onlinestore.users ALTER COLUMN user_id SET DEFAULT nextval('onlinestore.users_user_id_seq'::regclass);


--
-- Data for Name: users; Type: TABLE DATA; Schema: onlinestore; Owner: postgres
--

COPY onlinestore.users (user_id, type, first_name, last_name, login, password, phone_number, address) FROM stdin;
1	administrator	\N	\N	admin@onlinestore.app	admin123	\N	\N
2	employee	Anna	Kowalska	annakowalska@gmail.com	anna5251	\N	\N
3	customer	Grzegorz	Piasek	grzegorzpiasek@gmail.com	piasek112	229 156 651	ul. Krolewska 31, Krakow 30-039
\.


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: onlinestore; Owner: postgres
--

SELECT pg_catalog.setval('onlinestore.users_user_id_seq', 3, true);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: onlinestore; Owner: postgres
--

ALTER TABLE ONLY onlinestore.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- PostgreSQL database dump complete
--

