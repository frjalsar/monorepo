CREATE TABLE public.users (
	"id" serial NOT NULL,
	"fullname" text NULL,
	"username" text NOT NULL,
	"password" text NULL,
	"token" text NULL,
	"clubid" integer NULL,
	"regionid" integer NULL,
	"meetid" integer NULL,
	"application" boolean NULL,
	"admin" boolean NULL,		
	"_userid" integer NULL,
	"_enabled" boolean NULL DEFAULT true,
	"_time" timestamp NULL DEFAULT CURRENT_TIMESTAMP(3),	
	CONSTRAINT "username_unique" UNIQUE ("username"),
	CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);