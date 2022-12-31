CREATE TABLE public.equipment (
	"id" serial NOT NULL,
	"eventid" integer NULL,
	"gender" integer NULL,
	"age" integer NULL,
	"value" numeric NULL,
	"unit" text NULL,
	"_userid" integer NULL,
	"_enabled" boolean NULL DEFAULT true,
	"_time" timestamp NULL DEFAULT CURRENT_TIMESTAMP(3),
	CONSTRAINT "equipment_pkey" PRIMARY KEY ("id")
);