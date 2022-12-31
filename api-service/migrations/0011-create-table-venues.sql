CREATE TABLE public.venues (
	"id" serial NOT NULL,
	"fullname" text NULL,
	"indoor" boolean NULL,
	"banked" boolean NULL,
	"straightlanes" integer NULL,
	"ovallanes" integer NULL,
	"longtriplejump" integer NULL,
	"polevault" integer NULL,
	"hammerdiscus" integer NULL,
	"javelin" integer NULL,
	"shotput" integer NULL,
	"certification" boolean NULL,
	"material" text NULL,
	"constructionyear" integer NULL,
	"renovationyear" integer NULL,
	"warmuptrack" boolean NULL,
	"throwingfield" boolean NULL,
	"_userid" integer NULL,
	"_enabled" boolean NULL,
	"_time" timestamp NULL DEFAULT CURRENT_TIMESTAMP(3),
	CONSTRAINT "venues_pkey" PRIMARY KEY ("id")
);