-- =========================================
-- KinderHub – Database schema
-- =========================================
-- Drop tables (uncomment if you want to reset)
-- DROP TABLE IF EXISTS public.children;
-- DROP TABLE IF EXISTS public.users;
-- =========================================
-- Table: public.users
-- =========================================
CREATE TABLE IF NOT EXISTS public.users (
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY (
        INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1
    ),
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    full_name character varying(255) COLLATE pg_catalog."default",
    is_active boolean NOT NULL DEFAULT true,
    created_at timestamp without time zone DEFAULT now(),
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_email_key UNIQUE (email)
) TABLESPACE pg_default;

ALTER TABLE
    IF EXISTS public.users OWNER TO kinderhub;

-- =========================================
-- Table: public.children
-- =========================================
CREATE TABLE IF NOT EXISTS public.children (
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY (
        INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1
    ),
    parent_id integer NOT NULL,
    full_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    birthdate date,
    notes text COLLATE pg_catalog."default",
    created_at timestamp without time zone DEFAULT now(),
    CONSTRAINT children_pkey PRIMARY KEY (id),
    CONSTRAINT children_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.users (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE CASCADE
) TABLESPACE pg_default;

ALTER TABLE
    IF EXISTS public.children OWNER TO kinderhub;