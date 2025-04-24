import { getInterviewById } from "@/lib/actions/general.action";
import { redirect } from "next/navigation";
import Image from "next/image";
import DisplayTechIcons from "@/components/DisplayTechIcons";
import Agent from "@/components/Agent";
import { getCurrentUser } from "@/lib/actions/auth.action";
import ShinyText from "@/components/ShinyText";
import Link from "next/link";

const Page = async ({ params }: RouteParams) => {
  const { id } = await params;
  const user = await getCurrentUser();
  const interview = await getInterviewById(id);

  if (!interview) redirect("/");

  return (
    <>
      <div className="fixed inset-0 bg-black -z-10" />
      <div className="flex flex-row gap-4 justify-between">
        <div className="flex flex-row gap-4 items-center max-sm:flex-col">
          <div className="flex flex-row gap-4 items-center">
            <Link href="/">
              <Image
                src="/back.svg"
                alt="Back"
                width={40}
                height={40}
                className="cursor-pointer filter invert"
              />
            </Link>
            <ShinyText
              text={`${interview.role} Interview`}
              disabled={false}
              speed={3}
              className="text-2xl font-bold capitalize"
            />
          </div>
          <DisplayTechIcons techStack={interview.techstack} />
        </div>

        <p className="bg-white text-xl text-black font-bold px-4 py-2 rounded-lg h-fit capitalize">
          {interview.type}
        </p>
      </div>

      <Agent
        userName={user?.name}
        type={user?.id}
        interviewId={id}
        type="interview"
        questions={interview.questions}
      />
    </>
  );
};
export default Page;
