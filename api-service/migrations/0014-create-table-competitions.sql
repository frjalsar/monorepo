CREATE TABLE public.competitions (
	"id" serial NOT NULL,
	"meetid" integer NOT NULL,
	"eventid" integer NOT NULL,
	"agefrom" integer NULL,
	"ageto" integer NULL,
	"gender" integer NULL,
	"indoor"  boolean NULL,
	CONSTRAINT "competitions_pk" PRIMARY KEY ("id")
  CONSTRAINT "competitions_meets_fk" FOREIGN KEY ("meetid") REFERENCES public.meets("id"),
	CONSTRAINT "competitions_events_fk" FOREIGN KEY ("eventid") REFERENCES public.events("id")
);

CREATE INDEX "competitions_meetid" ON public.competitions USING btree ("meetid");
CREATE INDEX "competitions_eventid" ON public.competitions USING btree ("eventid");