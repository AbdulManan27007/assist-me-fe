"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { cn, daysAgo } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { MoreIcon, SearchIcon, SendIcon } from "@/icons";
import { Typography } from "@/components/core/Typography";
import { Divider } from "@/components/core/Divider";

export function TradieChat() {
  const [tickets, setTickets] = useState(
    Array.from({ length: 800 }, (_, i) => ({
      id: `ticket-${i + 1}`, // Simple unique ID
      number: `<Listing Title>${i + 1}`,
      title: `Ticket ${i + 1}`,
      description: `Description ${i + 1}`,
      status: "open",
      createdAt: new Date(
        Date.now() - Math.floor(Math.random() * 5 + 1) * 24 * 60 * 60 * 1000
      ),
      user: {
        id: i,
        name: `John Doe ${i + 1}`,
        email: `john.doe${i + 1}@example.com`,
        avatar: `https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp`,
      },
      messages: Array.from({ length: 20 }, (_, id) => ({
        id: `message-${id}`,
        read: i === 1 && id < 3 ? false : true,
        message: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae elit a nisl auctor vulputate mollis`,
        createdAt: new Date(
          Date.now() - (Math.random() < 0.5 ? 24 * 60 * 60 * 1000 : 0)
        ),
        author: ["user", "support"][Math.floor(Math.random() * 2)],
      })),
    }))
  );

  const [selectedTicket, setSelectedTicket] =
    useState<(typeof tickets)[number]>();

  const [message, setMessage] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = (behavior?: ScrollBehavior) =>
    messagesEndRef.current?.scrollIntoView({ behavior: behavior ?? "smooth" });

  useEffect(() => {
    scrollToBottom("instant");
  }, [selectedTicket]);

  const handleSend = () => {
    if (!selectedTicket || message.trim() === "") return;

    const thisTicket = tickets.find((t) => t.id === selectedTicket?.id);
    if (!thisTicket) return;

    const thisTicketWithNewMessage = {
      ...thisTicket,
      messages: [
        ...thisTicket.messages,
        {
          id: crypto.randomUUID(),
          read: true,
          message,
          createdAt: new Date(),
          author: "support",
        },
      ],
    };

    setTickets((prev) =>
      prev.map((t) =>
        t.id === selectedTicket?.id ? thisTicketWithNewMessage : t
      )
    );

    setSelectedTicket(thisTicketWithNewMessage);

    setMessage("");

    setTimeout(() => {
      scrollToBottom();
    }, 100);
  };

  const [search, setSearch] = useState("");

  return (
    <div className="p-4 mob:p-2">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 md:gap-16">
        <div>
          <Input
            value={search}
            placeholder="Search messages..."
            icon={<SearchIcon className="fill-black-1" />}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="max-h-[400px] md:max-h-[556px] overflow-y-auto scrollable">
            {tickets
              .filter(
                (ticket) =>
                  ticket.title.toLowerCase().includes(search.toLowerCase()) ||
                  ticket.number.toLowerCase().includes(search.toLowerCase())
              )
              .map((ticket) => (
                <div
                  onClick={() => {
                    setTickets((prev) =>
                      prev.map((t) =>
                        t.id === ticket.id
                          ? {
                              ...t,
                              messages: t.messages.map((message) => ({
                                ...message,
                                read: true,
                              })),
                            }
                          : t
                      )
                    );
                    setSelectedTicket(ticket);
                  }}
                  key={ticket.id}
                  className={cn(
                    "px-4 py-4 md:py-6 border-b border-[#0000001A] [&:last-child]:border-none hover:bg-white-2 transition-colors cursor-pointer",
                    selectedTicket?.id === ticket.id ? "bg-white-2" : ""
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      {/* <Typography
                        variant="14px/700/19.12px"
                        className="text-black-2"
                      >
                        {ticket.title}kkjkj
                      </Typography> */}
                      <div className="flex items-center gap-2">
                        <Image
                          width={32}
                          height={32}
                          alt={ticket.user.name}
                          src={ticket.user.avatar}
                          className="rounded-full"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <Typography
                              variant="14px/600/19.12px"
                              className="text-black-3"
                            >
                              {ticket.number}
                            </Typography>
                            {/* <Typography
                              variant="14px/400/21px"
                              className="text-black-5"
                            >
                              •
                            </Typography>
                            <Typography
                              variant="14px/400/21px"
                              className="text-black-5"
                            >
                              {daysAgo(ticket.createdAt.toISOString())}d
                            </Typography> */}
                          </div>
                          <Typography
                            variant="16px/700/21.86px"
                            className="text-black-4"
                          >
                            {ticket.user.name}
                          </Typography>
                        </div>
                      </div>
                    </div>
                    {ticket.messages.filter((message) => !message.read).length >
                    0 ? (
                      <div className="h-[22px] w-[22px] rounded-full bg-accent">
                        <Typography
                          variant="14px/400/21px"
                          className="text-white-1 text-center"
                        >
                          {
                            ticket.messages.filter((message) => !message.read)
                              .length
                          }
                        </Typography>
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
          </div>
        </div>
        {selectedTicket && (
          <div className="border border-[#0000001A] rounded-[12px] flex flex-col">
            <div className="p-4 md:p-6 flex items-center justify-between gap-2 border-b border-[#0000001A]">
              <div className="grid gap-2">
                {/* <Typography variant="20px/700/28px" className="text-black-1">
                  {selectedTicket.title}
                </Typography> */}
                <div className="flex items-center gap-2">
                  <Image
                    width={32}
                    height={32}
                    alt={selectedTicket.user.name ?? ""}
                    src={selectedTicket.user.avatar ?? ""}
                    className="rounded-full"
                  />
                  <div>
                    <Typography
                      variant="18px/700/24.59px"
                      className="text-black-3"
                    >
                      {selectedTicket.number}
                    </Typography>
                    <Typography
                      variant="14px/400/21px"
                      className="text-black-4"
                    >
                      {selectedTicket.user.name}
                    </Typography>
                  </div>
                </div>
              </div>
              <MoreIcon />
            </div>
            <div className="w-full h-[300px] md:h-[402px] overflow-y-auto scrollable flex-grow">
              {selectedTicket.messages
                .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
                .reduce<typeof selectedTicket.messages & string[]>(
                  (prev, message) => {
                    const formattedDate = message.createdAt.toLocaleDateString(
                      "en-US",
                      {
                        month: "long",
                        day: "numeric",
                      }
                    );

                    const today = new Date().toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                    });

                    const dateLabel =
                      formattedDate === today ? "Today" : formattedDate;

                    !prev.includes(dateLabel) && prev.push(dateLabel);

                    prev.push(message);
                    return prev;
                  },
                  []
                )
                .map((item) =>
                  typeof item === "string" ? (
                    <div key={item} className="h-[53px] grid items-center px-4 md:px-6">
                      <Divider text={item} />
                    </div>
                  ) : (
                    <div key={item.id} className="p-4 md:p-6 flex items-start gap-4">
                      <Image
                        width={32}
                        height={32}
                        alt={
                          item.author === "user"
                            ? selectedTicket.user.name
                            : "Me"
                        }
                        src={
                          item.author === "user"
                            ? selectedTicket.user.avatar
                            : "https://www.cribbageguy.com/images/products/7721.jpg"
                        }
                        className="rounded-full"
                      />
                      <div className="grid gap-2">
                        <div className="flex items-center gap-1">
                          <Typography
                            variant="14px/700/19.12px"
                            className="text-black-3"
                          >
                            {item.author === "user"
                              ? selectedTicket.user.name
                              : "Me"}
                          </Typography>
                          <Typography
                            variant="14px/400/19.12px"
                            className="text-black-5"
                          >
                            •
                          </Typography>
                          <Typography
                            variant="14px/400/19.12px"
                            className="text-black-5"
                          >
                            {item.createdAt.toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </Typography>
                        </div>
                        <Typography
                          variant="14px/400/19.12px"
                          className="text-black-5"
                        >
                          {item.message}
                        </Typography>
                      </div>
                    </div>
                  )
                )}
              <div ref={messagesEndRef} />
            </div>
            <div className="px-2 md:px-4 pb-4">
              <Input
                autoFocus
                value={message}
                
                icon={
                  <SendIcon
                    onClick={handleSend}
                    className="fill-black-1 cursor-pointer"
                  />
                }
                placeholder="Send message..."
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}