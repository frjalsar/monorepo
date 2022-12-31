CREATE TABLE public.events (
	"id" serial NOT NULL,
	"name" text NULL,
	"typeid" integer NULL,	
	"strid" text NULL,
	"iaaf" boolean NULL,
	"worldrecord" boolean NULL,
	"thorid" text NULL,
	"_userid" integer NULL,
	"_enabled" boolean NULL,
	"_time" timestamp NULL DEFAULT CURRENT_TIMESTAMP(3),
	CONSTRAINT "events_pkey" PRIMARY KEY ("id"),
	CONSTRAINT "events_eventtypes_fk" FOREIGN KEY ("typeid") REFERENCES public.eventtypes("id")
);