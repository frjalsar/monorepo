CREATE TABLE public.clubs (
	"id" serial NOT NULL,
	"shortname" text NULL,
	"fullname" text NULL,
	"abbreviation" text NULL,
	"district" text NULL,
	"thorid" text NULL,
	"regionid" integer NULL,
	"_time" timestamp NULL DEFAULT CURRENT_TIMESTAMP(3),
	"_userid" integer NULL,
	"_enabled" boolean NULL DEFAULT true,
	CONSTRAINT "clubs_pkey" PRIMARY KEY ("id"),
	CONSTRAINT "clubs_regions_fk" FOREIGN KEY ("regionid") REFERENCES public.regions("id")
);

CREATE INDEX "clubs_regionid" ON public.clubs USING btree ("regionid");