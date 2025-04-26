import dayjs from "dayjs";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DisplayTechIcons from "@/components/DisplayTechIcons";
import SpotlightCard from "./SpotlightCard";
import { getFeedbackByInterviewId } from "@/lib/actions/general.action";
const InterviewCard = async ({
  interviewId,
  userId,
  role,
  type,
  techstack,
  createdAt,
}: InterviewCardProps) => {
  const feedback =
    userId && interviewId
      ? await getFeedbackByInterviewId({
          interviewId,
          userId,
        })
      : null;

  const normalizedType = /mix/gi.test(type) ? "Mixed" : type;
  const formattedDate = dayjs(
    feedback?.createdAt || createdAt || Date.now()
  ).format("MMM D, YYYY");

  return (
    <div className="w-[360px] max-sm:w-full ">
      <SpotlightCard
        className={
          feedback
            ? "card-interview bg-gradient-to-b from-black/20 to-white/5 backdrop-blur-lg border !border-green-900"
            : "card-interview bg-gradient-to-b from-black/20 to-white/5 backdrop-blur-lg"
        }
      >
        <div>
          <div className="absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-white">
            <p className="badge-text text-black">{normalizedType}</p>
          </div>
          <h3 className="mt-5 capitalize">{role} Interview</h3>

          <div className="flex flex-row gap-5 mt-3">
            <div className="flex flex-row gap-2">
              <Image
                src="/calendar.svg"
                alt="calendar"
                width={22}
                height={22}
                className="brightness-0 invert"
              />
              <p>{formattedDate}</p>
            </div>

            <div className="flex flex-row gap-2 items-center ">
              <Image
                src="/star.svg"
                alt="star"
                width={22}
                height={22}
                className="brightness-0 invert"
              />
              <p>{feedback?.totalScore || "---"}/100</p>
            </div>
          </div>

          <p className="line-clamp-2 mt-5">
            {feedback?.finalAssessment ||
              "You haven't taken the interview yet. Take it now to improve your skills."}
          </p>
        </div>

        <div className="flex flex-row justify-between">
          <DisplayTechIcons techStack={techstack} />

          <Link
            href={
              feedback
                ? `/interview/${interviewId}/feedback`
                : `/interview/${interviewId}`
            }
            className="btn-link-container"
            data-loading-button
            passHref
          >
            <Button className={feedback ? "btn-primary-check" : "btn-primary"}>
              <span className="btn-text">
                {feedback ? "Check Feedback" : "View Interview"}
              </span>
            </Button>
          </Link>
        </div>
      </SpotlightCard>
    </div>
  );
};
export default InterviewCard;
