import dayjs from "dayjs";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DisplayTechIcons from "@/components/DisplayTechIcons";
import SpotlightCard from "./SpotlightCard";

const InterviewCard = ({
  id,
  userId,
  role,
  type,
  techstack,
  createdAt,
}: InterviewCardProps) => {
  const feedback = null as Feedback | null;
  const normalizedType = /mix/gi.test(type) ? "Mixed" : type;
  const formattedDate = dayjs(
    feedback?.createdAt || createdAt || Date.now()
  ).format("MMM D, YYYY");

  return (
    <div className="w-[360px] max-sm:w-full min-h-96">
      <SpotlightCard className="card-interview bg-gradient-to-b from-black/10 to-white/5 backdrop-blur-lg">
        <div>
          <div className="absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-white">
            <p className="badge-text text-black">{normalizedType}</p>
          </div>

          {/* <Image
            src={getRandomInterviewCover()}
            alt="cover image"
            width={60}
            height={60}
            className="rounded-full object-fit size-[60px]"
          /> */}

          <h3 className="mt-5 capitalize">{role} Interview</h3>

          <div className="flex flex-row gap-5 mt-3">
            <div className="flex flex-row gap-2">
              <Image
                src="/calendar.svg"
                alt="calendar"
                width={22}
                height={22}
              />
              <p className="text-white">{formattedDate}</p>
            </div>

            <div className="flex flex-row gap-2 items-center ">
              <Image src="/star.svg" alt="star" width={22} height={22} />
              <p className="text-white">{feedback?.totalScore || "---"}/100</p>
            </div>
          </div>

          <p className="line-clamp-2 mt-5 text-white">
            {feedback?.finalAssessment ||
              "You haven't taken the interview yet. Take it now to improve your skills."}
          </p>
        </div>

        <div className="flex flex-row justify-between">
          <DisplayTechIcons techStack={techstack} />

          <Button className="btn-primary" data-loading-state="false">
            <Link
              href={feedback ? `/interview/${id}/feedback` : `/interview/${id}`}
              className="btn-link-container"
            >
              <span className="btn-text">
                {feedback ? "Check Feedback" : "View Interview"}
              </span>
              <span className="btn-loading hidden">Loading...</span>
            </Link>
          </Button>
        </div>
      </SpotlightCard>
    </div>
  );
};
export default InterviewCard;
