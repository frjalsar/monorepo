CREATE TABLE public.athletes (
	"id" serial NOT NULL,
	"fullname" text NULL,
	"kt" char(10) NULL,
	"birthyear" integer NULL,
	"gender" smallint NULL,
	"country" char(3) NULL,
	"thorid" integer NULL,
	"lastcompeted" timestamp(6) with time zone NULL,
	"_enabled" boolean NULL DEFAULT true,
	"_userid" integer NULL,
	"_time" timestamp NULL,
	CONSTRAINT "athletes_pkey" PRIMARY KEY ("id")	
);

CREATE INDEX "athletes_fullname" ON public.athletes USING btree ("fullname");
CREATE INDEX "athletes_kt" ON public.athletes USING btree ("kt");