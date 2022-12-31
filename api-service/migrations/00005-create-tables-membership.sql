CREATE TABLE public.membership (
	"athleteid" integer NULL,
	"clubid" integer NULL,
	"legacyclub" text NULL,
	"athletesigned" text NULL,
	"clubsigned" text NULL,	
	"yearfrom" integer NULL,
	"yearto" integer NULL,
	"confirmed" boolean NULL,
	"_enabled" boolean NULL DEFAULT true,
	"_userid" integer NULL,
	"_time" timestamp NULL DEFAULT CURRENT_TIMESTAMP(3),
	CONSTRAINT "membership_athletes_fk" FOREIGN KEY ("athleteid") REFERENCES public.athletes("id"),
	CONSTRAINT "membership_clubs_fk" FOREIGN KEY ("clubid") REFERENCES public.clubs("id")
);

CREATE INDEX "membership_athleteid" ON public.membership USING btree ("athleteid");
CREATE INDEX "membership_clubid" ON public.membership USING btree ("clubid");