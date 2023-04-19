DROP TABLE onlinestore.users;

CREATE SCHEMA onlinestore;

CREATE TABLE onlinestore.users
(
    "user_id" integer NOT NULL,
    "type" varchar(50),
    "first_name" varchar(50),
    "last_name" varchar(50),
    "login" varchar(50),
    "password" varchar(50),
    "phone_number" varchar(11),
    "address" varchar(255)
);

ALTER TABLE onlinestore.users OWNER TO postgres;

INSERT INTO onlinestore.users VALUES
(1, 'administrator', NULL, NULL, 'admin@onlinestore.app', 'admin123', NULL, NULL),
(2, 'employee', 'Anna', 'Kowalska', 'annakowalska@gmail.com', 'anna5251', NULL, NULL),
(3,	'customer', 'Grzegorz', 'Piasek', 'grzegorzpiasek@gmail.com', 'piasek112', '229 156 651', 'ul. Krolewska 31, Krakow 30-039')
-- and so on...

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: onlinestore; Owner: postgres
--

-- CREATE SEQUENCE onlinestore.users_user_id_seq
--     AS integer
--     START WITH 1
--     INCREMENT BY 1
--     NO MINVALUE
--     NO MAXVALUE
--     CACHE 1;


-- ALTER TABLE onlinestore.users_user_id_seq OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: onlinestore; Owner: postgres
--

-- ALTER SEQUENCE onlinestore.users_user_id_seq OWNED BY onlinestore.users.user_id;

--
-- Name: users user_id; Type: DEFAULT; Schema: onlinestore; Owner: postgres
--

-- ALTER TABLE ONLY onlinestore.users ALTER COLUMN user_id SET DEFAULT nextval('onlinestore.users_user_id_seq'::regclass);

--
-- Data for Name: users; Type: TABLE DATA; Schema: onlinestore; Owner: postgres
--

-- COPY onlinestore.users (user_id, type, first_name, last_name, email, password, phone_number, address) FROM stdin;
-- 1	Administrator	 	 	admin@gmail.com	admin1234	 	 
-- 2	Employee	Anna	Kowalska	annakowalska@gmail.com	anna5251	 	 
-- 3	Customer	Grzegorz	Piasek	grzegorzpiasek@gmail.com	piasek112	+48 229 156 651	ul. Krolewska 31, Krakow 30-039
-- 4	Customer	Zuzanna	Tyrawa	tyrawazuzanna@gmail.com	pilka1234	+48 149 994 499	ul. Wroclawska 2, Krakow 30-024
-- 5	Customer	Adam	Gora	adamgora@gmail.com	gorka123	+48 252 553 762	ul. Bronowicka 27/13, Krakow 30-085
-- 6	Employee	Anna	Kowalska	annakowalska@gmail.com	anna5251	
-- \.

--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: onlinestore; Owner: postgres
--

-- SELECT pg_catalog.setval('onlinestore.users_user_id_seq', 6, true);

--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: onlinestore; Owner: postgres
--

-- ALTER TABLE ONLY onlinestore.users ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);

--
-- PostgreSQL database dump complete
--
