CREATE TABLE public.meets (
	"id" serial NOT NULL,
	"name" text NULL,
	"startdate" timestamp NULL,
	"enddate" timestamp NULL,
	"judgeid" integer NULL,
	"organizername" text NULL,
	"organizerkt" text NULL,
	"location" text NULL,
	"venueid" integer NULL,
	"contactname" text NULL,
	"contactemail" text NULL,
	"contactphone" text NULL,
	"status" integer NULL DEFAULT 1,
	"sent" timestamp NULL DEFAULT CURRENT_TIMESTAMP(3),
	"attachment" bytea NULL, 
	"_userid" integer NULL,
	"_enabled" boolean NULL DEFAULT true,
	"_time" timestamp NULL DEFAULT CURRENT_TIMESTAMP(3),	
	CONSTRAINT "meets_pkey" PRIMARY KEY ("id"),
	CONSTRAINT "meets_judges_fk" FOREIGN KEY ("judgeid") REFERENCES public.judges("id"),
	CONSTRAINT "meets_venues_fk" FOREIGN KEY ("venueid") REFERENCES public.venues("id")
);

CREATE INDEX "meets_judgeid" ON public.meets USING btree ("judgeid");
CREATE INDEX "meets_venueid" ON public.meets USING btree ("venueid");