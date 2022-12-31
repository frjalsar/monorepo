CREATE TABLE public.judgetypes (
	"id" serial NOT NULL,
	"name" text NULL,
	"stage" integer NULL,
	"_userid" integer NULL,
	"_enabled" boolean NULL DEFAULT true,
	"_time" timestamp NULL DEFAULT CURRENT_TIMESTAMP(3),
	CONSTRAINT "judgetypes_pkey" PRIMARY KEY ("id")
);