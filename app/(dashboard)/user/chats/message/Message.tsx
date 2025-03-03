"use client"

import React, { useContext, useEffect, useState } from 'react';


import { useUserData } from '@/utils/encript_decript';
import useApiRequest from '@/app/hooks/useApiRequest';
import upload_audio from '@/app/hooks/useUploadAudio';
import uploadImage from '@/app/hooks/useUploadImage';
import ChatArea from '../components/ChatArea';
import Sidebar from '../components/Sidebar';
import { useQuery } from '@tanstack/react-query';

type ApiResponse = {
      data: any
      total: number
}

function Message() {

      const [user] = useUserData()

      const { data: users = [], isLoading, error, refetch } = useQuery({
            queryKey: ["all_user", user?._id],
            queryFn: async () => {
                  const res = await fetch(`${process.env.NEXT_APP_BASE_URL}/api/v1/chat/get-all-messaged-users?token=${user?._id}&user_id=${user?._id}`);
                  if (!res.ok) {
                        throw new Error("Failed to fetch candidate data");
                  }
                  const result = await res.json();
                  return result.data;
            },
            enabled: !!user?._id && !!process.env.NEXT_APP_BASE_URL,
      });

      const [selectedUser, setSelectedUser] = useState<any>(null);

      useEffect(() => {
            if (users.length > 0) {
                  setSelectedUser(users[0]);
            }
      }, [users]);

      const { data: messages = [], isLoading: isMessagesLoading, error: messagesError, refetch: refetchMessages } = useQuery({
            queryKey: ["chat", user?._id, selectedUser?.user_id],
            queryFn: async () => {
                  const res = await fetch(`${process.env.NEXT_APP_BASE_URL}/api/v1/chat/get-chat-by-user?token=${user?._id}&to=${selectedUser?.user_id}&sender=${user?._id}`);
                  if (!res.ok) {
                        throw new Error("Failed to fetch candidate data");
                  }
                  const result = await res.json();
                  return result.data;
            },
            enabled: !!user?._id && !!process.env.NEXT_APP_BASE_URL && !!selectedUser?.user_id,
      });


      const handleSendMessage = async (message: any) => {

            const newMessage = {
                  to: selectedUser?.user_id,
                  sender: user?._id,
                  content: message.text,
                  attachments: message.attachments?.length
                        ? await Promise.all(message.attachments.map(async (attachment: any) => uploadImage(attachment.file)))
                        : [],
                  audio: message.audio ? await upload_audio(message.audio) : null,
                  timestamp: new Date().toISOString(),
            };

            fetch(`${process.env.NEXT_APP_BASE_URL}/api/v1/chat/add-new-chat?token=${user?._id}`, {
                  method: "POST",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  body: JSON.stringify(newMessage),
            })
                  .then((res) => res.json())
                  .then((data) => {
                        refetch();
                        refetchMessages();
                  });

            // setMessages(prevMessages => ({
            //       ...prevMessages,
            //       [selectedUser.id]: [...prevMessages[selectedUser.id], newMessage]
            // }));
      };


      console.log("testing..........");

      return (
            <div className="flex h-[calc(100vh-48px] w-full">
                  {/* <div className="bg-[#F5F7FB] w-[70%] overflow-y-auto">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa accusamus placeat velit rerum soluta amet molestias ipsam blanditiis laboriosam, iusto incidunt, obcaecati, non itaque illo? Perferendis, corrupti magni dicta, maxime nesciunt quis, impedit voluptatem quod fuga iste recusandae numquam quam facere facilis natus enim? Facere culpa deserunt, molestiae voluptatem explicabo eum sint, doloremque accusantium eaque veniam rem, vel delectus accusamus dolore sed laborum velit commodi veritatis animi. Ab nam quos eum totam vero omnis nihil velit sunt maxime rerum mollitia illo non id laudantium placeat, ea ducimus harum, quis neque delectus fuga quo. Corporis suscipit assumenda, deleniti nemo nulla quibusdam cum temporibus iusto harum consequatur at velit ab sint accusantium vitae porro exercitationem aut! Distinctio placeat consectetur sequi. Laborum incidunt quam labore ad esse temporibus, commodi corporis nemo odit facilis porro dignissimos reiciendis cumque, odio quidem. Ipsam dolor soluta reiciendis illum voluptatum reprehenderit quidem, consectetur, atque nisi itaque earum exercitationem delectus magnam quia nihil consequatur fugiat doloremque ducimus suscipit, cumque odio! Soluta quibusdam ut, porro adipisci perferendis ab architecto saepe maxime, voluptates excepturi quo fugit vitae inventore, optio veniam modi ad fuga repellat alias quasi nam amet! Odit veniam molestiae modi dolore a harum deleniti asperiores error, nostrum sint quia, mollitia ducimus, maxime quibusdam illum sed nulla obcaecati dolorem. Harum veritatis qui in facilis inventore excepturi quidem voluptatum quaerat itaque voluptatem. Magnam quasi quidem, blanditiis dolorum distinctio voluptate veniam vel ducimus veritatis eaque dolores explicabo at enim accusamus placeat voluptatibus, totam reiciendis. Quaerat labore quo asperiores, enim minima obcaecati sunt, cum iure porro sequi aperiam vel tempora? Vero a debitis accusamus nemo repellendus? Corporis qui quis nesciunt blanditiis magnam sint? Mollitia aperiam quidem libero nesciunt eligendi optio, quas facilis ducimus odio expedita sequi quae ipsum illo impedit vero modi, laudantium blanditiis ad soluta voluptatem, nemo consequatur? Voluptates eius delectus cum necessitatibus at unde similique dolore fuga dolorum. Vitae facere mollitia iste quae quaerat culpa possimus iusto alias sunt? Exercitationem sapiente optio dolore doloribus unde beatae, quos, et, corporis facilis mollitia non officia architecto nulla id voluptate quis repudiandae vero. Voluptatem explicabo repudiandae officiis aliquid inventore odio commodi. Nostrum eum maiores a rem nihil non aliquam optio veritatis culpa, eos velit, placeat amet. Et eum odio, delectus accusamus amet eaque ipsa ex doloribus! Reprehenderit aliquam veniam cum aliquid dolorem dolor in vel numquam tenetur quis! Doloremque id sit voluptates eos architecto, hic minus cum tenetur praesentium facilis maxime corporis consequuntur corrupti sequi officia ipsa quo quaerat sed perspiciatis quibusdam! Ducimus ullam consequatur harum pariatur iusto sequi neque excepturi voluptate voluptatibus sed hic iste, voluptatum doloremque! Iste molestiae ea soluta hic, assumenda dicta qui aliquam accusantium eveniet quo iure optio esse excepturi error iusto aut. Voluptatum iusto quaerat incidunt nihil facere similique sint placeat perferendis quidem sit velit, vel, dignissimos esse ipsum aliquam assumenda sed hic repellendus aliquid odit corporis suscipit quisquam omnis veritatis. Minima recusandae distinctio commodi expedita. Consequatur facilis explicabo est dignissimos, tenetur magnam quia fugiat, sequi inventore eius repellendus odio voluptas vel minima unde. Minus doloribus omnis aperiam, nulla commodi quaerat, est facere totam fugit dolor delectus sint placeat tempora id hic dolorum necessitatibus, deleniti temporibus voluptatibus cupiditate! Exercitationem quaerat provident hic ipsam quod harum iure voluptate! Repellat, possimus. Delectus amet quos tenetur, consequuntur recusandae facilis soluta distinctio odio! Obcaecati ad itaque, ratione tempore deserunt illum autem reprehenderit iste nam corporis tempora quia beatae doloremque saepe vitae dolor blanditiis perferendis magnam quos aliquam id cum. Ratione expedita perferendis ullam tempora debitis earum eum vitae itaque dolores exercitationem sit voluptate ex numquam, quod totam eaque quasi ea atque amet consequatur maiores suscipit tenetur? Accusamus, voluptate error! Tempora, sunt? Maiores, magnam?
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem in ipsum officiis incidunt atque explicabo vitae harum quos libero perspiciatis, fuga consequatur excepturi sint molestias possimus, assumenda, asperiores quo nemo? Ad aliquam optio esse libero aperiam? Culpa rem repellat placeat non, laudantium quasi qui ipsum. Alias eius assumenda iure quisquam adipisci, impedit tempora obcaecati neque magnam eligendi quaerat nostrum? Maiores beatae itaque amet animi corporis, nihil veniam fugit officia! Recusandae sint amet vitae exercitationem eius inventore deleniti voluptas cupiditate voluptatum doloremque tempore minima maiores reprehenderit nihil nobis, ipsum ratione mollitia iste eos necessitatibus? Ratione, soluta? Sequi sunt dicta necessitatibus hic? Et iusto perspiciatis non quam suscipit veniam rerum aliquam quod ut excepturi accusantium maxime reiciendis dolor necessitatibus, eligendi exercitationem provident, veritatis ratione obcaecati possimus ipsam. Error atque assumenda architecto. Placeat enim accusantium, ducimus doloremque fugit, error quaerat at ipsa facilis minima porro magni aliquid tempora! Dolores aliquid impedit delectus doloribus aperiam. Porro in sint ipsum unde accusamus nobis facere nam atque saepe perferendis nulla ex optio minima laudantium ducimus inventore et, iusto corrupti odit, officia voluptate numquam quae quos! Iusto exercitationem fugit sit? Eligendi harum labore, odit distinctio recusandae sunt quia fugiat assumenda saepe laboriosam necessitatibus ipsa cupiditate explicabo ducimus deleniti cum eos debitis. Laudantium ducimus totam, neque fuga alias optio sequi beatae amet placeat dolor et adipisci quis natus illo ratione quae facere, repellendus cupiditate rerum culpa nobis non unde? Dicta veniam placeat, atque ad ab fugiat animi eligendi magnam dolorem quis dolor non dolores esse quam voluptatem nulla provident aperiam totam voluptatum unde facilis repellendus. Harum, architecto at omnis ut perferendis quo expedita laborum nulla! Sequi veritatis quod excepturi dolorum sit debitis optio minus, illum tempore laboriosam. Quod voluptatibus cum harum recusandae dicta. Corrupti voluptatibus quidem facilis a alias, amet minus enim minima. Alias nisi pariatur vitae excepturi rem magni sint impedit aliquid, enim in hic ad quia laboriosam facilis velit aliquam beatae. Quasi quia consectetur omnis dolor deserunt voluptatum nisi dolorem fuga temporibus, amet molestiae fugiat architecto accusantium, praesentium soluta aliquam totam nihil eum officiis officia. Voluptates labore nam natus et quo quaerat, possimus ullam repudiandae architecto voluptatem voluptas distinctio autem minus enim doloremque a tenetur. Voluptatibus nihil ex in. Minus voluptatem provident illo iste, distinctio necessitatibus aliquam quod vitae. Maiores dolores quibusdam maxime architecto repellendus quae voluptatum magni laudantium asperiores mollitia corporis ex, ipsam delectus laboriosam? Accusantium quibusdam optio eum. Beatae alias velit reiciendis architecto voluptatibus, itaque vitae? Voluptas sequi quibusdam inventore, eligendi recusandae explicabo vero nam? Atque libero, adipisci fugit iste, explicabo quasi vitae labore minus placeat ipsum asperiores blanditiis nobis officiis pariatur officia sunt quibusdam? Quae ullam aperiam earum facilis provident? Dolore ex dolores, ea eos quam voluptatum. Tenetur id adipisci, hic dolore ad blanditiis labore. Aliquid earum quas dolor. Quae ducimus sint sunt. Eius molestiae tempore deserunt animi voluptate consequuntur non atque a natus aliquam ad incidunt minus libero ratione soluta, autem id pariatur expedita doloribus quibusdam tempora. Possimus debitis praesentium mollitia veniam labore qui, nihil quisquam obcaecati. Corrupti autem sapiente voluptates ullam.
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia delectus sequi vitae earum tempore quod a deserunt. Delectus mollitia ut rem blanditiis, perspiciatis culpa numquam natus odio necessitatibus expedita aperiam? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam amet esse distinctio, nam obcaecati quae tempore impedit quaerat asperiores accusantium nisi ducimus, nostrum repudiandae incidunt adipisci porro et consectetur magni minima itaque! Laborum repellendus necessitatibus dolor officiis? Reprehenderit quod repudiandae quae dolorem dolore aliquid necessitatibus voluptatum voluptas id officia consequuntur quasi nemo dignissimos rerum accusamus ullam perspiciatis doloribus alias laborum animi nesciunt, illo, dicta ut. Neque quibusdam quas dolorum eius vel corrupti, atque ex a, quis debitis, rerum eligendi fuga quam vero similique sit ipsa dolore. Culpa quasi molestiae nobis aliquid, adipisci aut nemo quam, ad explicabo, totam voluptatum. Aspernatur ab assumenda porro doloremque, sequi delectus ratione, sapiente inventore quod quis possimus harum soluta fuga dolor ipsam veniam non pariatur itaque ea voluptates corporis temporibus! Alias laboriosam mollitia sapiente quae illum est quaerat quo officiis nemo provident, at reiciendis. Accusantium odit distinctio modi impedit fugit. Quibusdam nihil totam rem vitae fugit rerum, at, temporibus tempora voluptatibus, nemo earum quod ullam labore? Reiciendis reprehenderit sequi beatae veniam recusandae voluptatem amet nesciunt. Sit sapiente necessitatibus magnam porro odit laudantium officia veniam odio quod itaque illum incidunt minima aspernatur, ullam esse, nesciunt vitae atque laborum veritatis vero. Quos, autem labore sit quasi nisi nobis doloremque quia. Facilis in nisi provident, minima omnis laborum dolorum veritatis esse quo voluptas magnam ipsa veniam repellendus obcaecati exercitationem sunt beatae ad ipsam eos? Nam eveniet, perspiciatis adipisci alias quam incidunt vero accusamus enim saepe libero. Impedit mollitia nisi fugiat perferendis natus magnam nobis. Facere laboriosam, fugit doloribus earum, dolorum facilis explicabo corporis, repellendus vitae officia doloremque totam! Error quo necessitatibus ipsum dolores ad explicabo fugit velit veritatis, consectetur doloremque voluptas eum id impedit mollitia vitae dolorem, quidem quam hic iusto iure beatae, ut voluptate? Deserunt officiis quidem cupiditate dolore reprehenderit nihil suscipit molestiae, necessitatibus incidunt quisquam facere debitis et maxime dolor repudiandae cumque numquam! Labore suscipit, sit eligendi unde accusantium saepe? Quaerat quos atque numquam at voluptates officia necessitatibus est tenetur? Ullam, cumque, debitis facilis beatae laborum voluptatem aliquam nihil eius ratione iste molestiae aperiam perspiciatis quia! Voluptatem sed consequuntur eveniet? Aperiam iure, minima ea similique omnis ad quod dolorum cum obcaecati laboriosam officia, hic temporibus laborum numquam enim pariatur vel ab, modi quia quas iusto? Itaque fugiat sapiente minima officia provident molestias odio illum corporis numquam. Explicabo atque officiis assumenda libero provident in laboriosam rerum quas nemo necessitatibus. Officia dolore cumque alias voluptatem obcaecati tempore, earum facere quod consectetur repellat asperiores exercitationem, unde nisi perferendis distinctio hic est magni impedit. Doloremque rem vero, fuga consectetur praesentium laboriosam corporis cupiditate voluptas incidunt, dolores doloribus nam. Quibusdam, consequatur veniam. Non quam ipsam ab molestiae. Libero repellat est eveniet autem. Facere expedita assumenda eaque inventore eos voluptate dolorum soluta corrupti, in dolorem mollitia officia animi repellendus laudantium non dolores debitis sunt. Autem doloribus veniam expedita debitis quia necessitatibus voluptatum delectus qui illo quam error atque, mollitia aspernatur nisi eveniet, corrupti animi quae aliquid sint molestiae fuga magni facilis. Error cum molestiae est nisi doloremque eveniet sapiente aut repudiandae ut?
                  </div>
                  <div className="bg-[#e84545] w-[30%] overflow-y">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo hic inventore, obcaecati molestias autem consequatur explicabo, possimus, maiores molestiae facere delectus eum doloribus saepe dignissimos. Aperiam quaerat voluptate sit in. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum ipsam rem dolor, architecto unde et maxime fugiat! Perferendis, debitis. Laboriosam mollitia impedit voluptates. Iure tempore nam error nemo labore incidunt.
                  </div> */}
                  <ChatArea
                        messages={messages}
                        selectedUser={selectedUser}
                        onSendMessage={handleSendMessage}
                        candidate={selectedUser}
                        refetch={refetchMessages}
                        isLoading={isMessagesLoading}
                  />

                  <div style={{ width: '320px' }}>
                        <Sidebar
                              users={users}
                              onSelectUser={setSelectedUser}
                              selectedUser={selectedUser}

                        />
                  </div>
            </div>
      );
}

export default Message;
