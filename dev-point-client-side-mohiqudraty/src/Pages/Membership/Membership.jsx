// import { useEffect, useState } from "react";
import MembershipCards from "./MembershipCards";
import useMembership from "../../Api/useMembership";

const Membership = () => {
  const { plan } = useMembership();

  return (
    <section className="grid  md:grid-cols-2 lg:grid-cols-3  px-3 mt-10 ">
      {plan?.map((p) => (
        <MembershipCards key={p.type} p={p}></MembershipCards>
      ))}
    </section>
  );
};

export default Membership;
