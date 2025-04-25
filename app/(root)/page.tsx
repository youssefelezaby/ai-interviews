import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import MetaBalls from "@/components/MetaBalls";
import InterviewCard from "@/components/InterviewCard";
import Waves from "@/components/Waves";

import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getInterviewsByUserId,
  getLatestInterviews,
} from "@/lib/actions/general.action";
const page = async () => {
  const user = await getCurrentUser();

  const [userInterviews, latestInterviews] = await Promise.all([
    await getInterviewsByUserId(user?.id!),
    await getLatestInterviews({ userId: user?.id! }),
  ]);

  const hasPastInterviews = userInterviews?.length > 0;
  const hasUpcomingInterviews = latestInterviews?.length > 0;
  return (
    <>
      <section className="card-cta relative flex items-center gap-8 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <Waves
            lineColor="#fff"
            backgroundColor="rgba(255, 255, 255, 0.2)"
            waveSpeedX={0.02}
            waveSpeedY={0.01}
            waveAmpX={40}
            waveAmpY={20}
            friction={0.9}
            tension={0.01}
            maxCursorMove={120}
            xGap={12}
            yGap={170}
          />
        </div>
        <div className="relative z-10 flex flex-col gap-6 lg:w-3/4">
          <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
          <p className=" text-lg lg:text-xl text-white/80">
            Practice on real interview questions & get instant feedback
          </p>
          <Button asChild className="btn-primary" data-loading-state="false">
            <Link href="/interview" className="btn-link-container">
              <span className="btn-text">Generate a New Interview</span>
              <span className="btn-loading hidden">Loading...</span>
            </Link>
          </Button>
        </div>
        <div className="relative z-10 w-full lg:w-1/3 h-90 hidden lg:block order-2 ml-auto">
          <MetaBalls
            color="#ffffff"
            cursorBallColor="#ffffff"
            cursorBallSize={2}
            ballCount={15}
            animationSize={23}
            enableMouseInteraction={true}
            enableTransparency={true}
            hoverSmoothness={0.05}
            clumpFactor={0.9}
            speed={0.3}
          />
        </div>
      </section>
      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interviews</h2>
        <div className="interviews-section">
          {hasPastInterviews ? (
            userInterviews?.map((interview) => (
              <InterviewCard {...interview} key={interview.id} />
            ))
          ) : (
            <p>You haven&apos;t taken any interviews yet</p>
          )}
        </div>
      </section>
      <section className="flex flex-col gap-6 mt-8">
        <h2>Take an Interview</h2>
        <div className="interviews-section">
          {hasUpcomingInterviews ? (
            latestInterviews?.map((interview) => (
              <InterviewCard {...interview} key={interview.id} />
            ))
          ) : (
            <p>There are no new interviews available</p>
          )}
        </div>
      </section>
    </>
  );
};

export default page;
