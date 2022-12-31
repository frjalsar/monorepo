CREATE TABLE public.eventtypes (
	"id" serial NOT NULL,
	"name" text NOT NULL,
	"ordering" integer NULL,
	"_userid" integer NULL,
	"_enabled" boolean NULL DEFAULT true,
	"_time" timestamp NULL DEFAULT CURRENT_TIMESTAMP(3),	
	CONSTRAINT "eventtype_pkey" PRIMARY KEY ("id")
);