CREATE TABLE public.combinedevents (
	"parenteventid" integer NOT NULL,
	"childeventid" integer NOT NULL,
	"_userid" integer NULL,
	"_enabled" boolean NULL DEFAULT true,
	"_time" timestamp NULL DEFAULT CURRENT_TIMESTAMP(3),
	CONSTRAINT "combinedevents_events_fk1" FOREIGN KEY ("parenteventid") REFERENCES public.events("id"),
	CONSTRAINT "combinedevents_events_fk2" FOREIGN KEY ("childeventid") REFERENCES public.events("id")
);

CREATE INDEX "combinedevents_parenteventid" ON public.combinedevents USING btree ("parenteventid");
CREATE INDEX "combinedevents_childeventid" ON public.combinedevents USING btree ("childeventid");