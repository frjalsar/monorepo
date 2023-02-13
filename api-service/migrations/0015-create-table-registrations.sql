CREATE TABLE public.registrations (
	"id" serial NOT NULL,
	"competitionid" integer NOT NULL,
	"athleteid" integer NOT NULL,
	"note" integer NULL,	
	CONSTRAINT "registrations_pk" PRIMARY KEY ("id")
  CONSTRAINT "registrations_competitions_fk" FOREIGN KEY ("competitionid") REFERENCES public.competitions("id"),
	CONSTRAINT "registrations_competitions_fk" FOREIGN KEY ("athleteid") REFERENCES public.athletes("id")
);

CREATE INDEX "registrations_competitionid" ON public.registrations USING btree ("competitionid");
CREATE INDEX "registrations_athleteid" ON public.registrations USING btree ("athleteid");