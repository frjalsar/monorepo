CREATE TABLE public.judges (
	"id" serial NOT NULL,
	"fullname" text NULL,
	"date" timestamp NULL,
	"clubid" integer NULL,
	"typeid" integer NULL,
	"_enabled" boolean NULL DEFAULT true,
	"_userid" integer NULL,
	"_time" timestamp NULL DEFAULT CURRENT_TIMESTAMP(3),	
	CONSTRAINT "judges_pkey" PRIMARY KEY ("id"),
	CONSTRAINT "judges_clubs_fk" FOREIGN KEY ("clubid") REFERENCES public.clubs("id"),
	CONSTRAINT "judges_judgetypes_fk" FOREIGN KEY ("typeid") REFERENCES public.judgetypes("id")
);

CREATE INDEX "judges_clubid" ON public.judges USING btree ("clubid");
CREATE INDEX "judges_typeid" ON public.judges USING btree ("typeid");