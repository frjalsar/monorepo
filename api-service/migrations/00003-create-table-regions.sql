CREATE TABLE public.regions (
	"id" serial NOT NULL,
	"abbreviation" text NULL,
	"fullname" text NULL,
	"_time" timestamp NULL DEFAULT CURRENT_TIMESTAMP(3),
	"_userid" integer NULL,
	"_enabled" boolean NULL DEFAULT true,
	CONSTRAINT "regions_pkey" PRIMARY KEY ("id")
);