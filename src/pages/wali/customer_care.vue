import { BsSend } from "react-icons/bs";
import { CustomerCare } from "../../midleware/api";
import { Store } from "../../store/Store";
import { useEffect, useState } from "react";
import Modal from "../../component/modal";

const PesanCs = () => {
  const { token, id } = Store();
  const [fetch, setFetch] = useState<any[]>([]);
  const [message, setMessage] = useState<any[]>([]);
  const [currentChatUser, setCurrentChatUser] = useState<string>("");

  const FetchData = async () => {
    try {
      const response = await CustomerCare.GetAllUserChat(token, id);
      setFetch(response.data.data);
    } catch {
      console.error("error");
    }
  };

  const showModal = (props: string) => {
    let modalElement = document.getElementById(props) as HTMLDialogElement;
    if (modalElement) {
      modalElement.showModal();
    }
  };

  const closeModal = (props: string) => {
    let modalElement = document.getElementById(props) as HTMLDialogElement;
    if (modalElement) {
      modalElement.close();
    }
  };

  const GetMessage = async (withId: number, fullName: string) => {
    try {
      setCurrentChatUser(fullName);
      const response = await CustomerCare.GetMessage(token, id, withId);
      setMessage(response.data.messages);
    } catch {
      console.error("error");
    }
  };

  useEffect(() => {
    FetchData();
  }, [id]);

  return (
    <div className="w-full flex flex-col items-center pb-10 min-h-screen relative">
      <div className="w-full text-center my-10">
        <span className="text-4xl font-bold">Customer Care</span>
      </div>
      <div className="w-5/6 shadow-lg max-h-[650px] min-h-[650px] relative">
        <div className="flex w-full">
          <div className="w-1/4 shadow-md min-h-[650px] z-10 glass">
            <div className="w-full p-5 text-3xl font-bold bg-white">Chats</div>
            {fetch.map((item, index) => (
              <div
                key={index}
                className="w-full p-3 bg-blue-300 flex gap-2 cursor-pointer"
                onClick={() => GetMessage(item.withUser.id, item.withUser.full_name)}
              >
                <div className="flex flex-col w-full">
                  <span className="font-bold">{item.withUser.full_name}</span>
                </div>
              </div>
            ))}
            <div className="toast">
              <div className="dropdown dropdown-top dropdown-end">
                <label
                  className="btn btn-primary btn-circle"
                  onClick={() => showModal("daftar-chat")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </label>
              </div>
            </div>
          </div>
          <div className="w-3/4 glass">
            <div className="w-full p-5 text-3xl font-bold bg-white shadow-md">
              {currentChatUser || "Pilih chat"}
            </div>
            <div className="p-3 w-full min-h-[500px] max-h-[500px] overflow-auto">
              {message.map((item, index) => (
                <div key={index}>
                  <div className={item.sender_id === id ? "chat chat-end" : "chat chat-start"}>
                    <div className={item.sender_id === id ? "chat-bubble chat-bubble-accent" : "chat-bubble chat-bubble-primary"}>
                      {item.message}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full px-5">
              <label className="input input-bordered flex items-center gap-2">
                <input type="text" className="grow" placeholder="Type your message..." />
                <span className="text-2xl cursor-pointer">
                  <BsSend />
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <Modal id="daftar-chat">
        <div className="flex justify-center w-full">
          <span className="text-xl font-bold">Daftar Chat</span>
        </div>
        {/* Daftar pengguna untuk memulai chat */}
        <div className="w-full p-5">
          {fetch.map((item, index) => (
            <div
              key={index}
              className="w-full p-3 bg-blue-300 flex gap-2 cursor-pointer"
              onClick={() => {
                closeModal("daftar-chat");
                GetMessage(item.withUser.id, item.withUser.full_name);
              }}
            >
              <div className="flex flex-col w-full">
                <span className="font-bold">{item.withUser.full_name}</span>
              </div>
            </div>
            <div class="flex tw-flex-col justify-start items-start q-pl-md tw-w-5/6">
              <p class="text-bold text-h6">{{ user?.full_name }}</p>
            </div>
          </div>
        </q-card>
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat label="Cancel" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import NavbarSiswa from "../../components/siswa/HederSiswa.vue";
import { ref } from "vue";
import Swal from "sweetalert2";
import socket from "../../socket"

export default {
  components: {
    NavbarSiswa,
  },
  setup() {
    return {
      medium: ref(false),
      drawer: ref(true),
      users: ref([]),
      messages: ref([]),
      currentMessageId: ref(),
      currentReceiverId: ref(),
      currentReceiverName: ref(""),
      token: ref(sessionStorage.getItem("token")),
      idUser: ref(sessionStorage.getItem("idUser")),
      idSender: ref(""),
      inputMessage: ref(""),
      dataUser: ref([]),
      fokus: ref(false),
      typing: ref(true),
    };
  },
  mounted() {
    this.getUserChats();
    socket.connect()
    socket.on('cc_refresh', () => {
      this.getUserChats()
      this.getMessages()
    })
  },
  watch: {
    currentMessageId: {
      handler(value) {
        this.getMessages();
      },
    },
    inputMessage(newVal) {
      newVal ? (this.typing = false) : (this.typing = true);
    },
  },
  methods: {
    //GET ALL USER CHAT
    async getUserChats() {
      try {
        const response = await this.$api.get(
          `user-chat/show-by-user/${this.idUser}`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );

        this.users = response.data.data;
      } catch (err) {
        Swal.fire({
          title: err.message,
          text: "Tunggu sebentar ya, atau refresh kembali",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Refresh Now",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      }
    },

    async setUpMessage(rowData) {
      this.currentReceiverId = rowData.with_id;
      this.currentReceiverName = rowData.withUser.full_name;
      this.getMessages();
    },
    async newMessage(rowData) {
      this.currentReceiverId = rowData.id;
      this.currentReceiverName = rowData.full_name;
      this.messages = [];
      this.medium = false;
    },

    async getUsers() {
      this.medium = true;
      this.getDataGuru();
    },
    async getMessages() {
      try {
        const currentTime = new Date();
        const response = await this.$api.get(
          `user-chat/show-conversation?userid=${this.idUser}&withid=${this.currentReceiverId}`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        const data = response.data.data[0].messages;
        this.messages = data?.map((message) => ({
          text: message.message,
          sender:
            message.sender_id != this.idUser ? this.currentReceiverName : "Me",
          color: message.sender_id != this.idUser ? "primary" : "amber-7",
          textColor: message.sender_id != this.idUser ? "white" : "black",
          isSender: message.sender_id != this.idUser ? false : true,
          stamp: this.getCurrentDateTime(message.createdAt),
        }));
        this.getUserChats();
      } catch (err) {
        console.log(err);
      }
    },

    getCurrentDateTime(date) {
      const now = new Date(date);
      const formattedDate = now.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      });
      const formattedTime = now.toLocaleTimeString("id-ID", {
        hour: "numeric",
        minute: "numeric",
      });
      return `${formattedDate} , ${formattedTime}`;
    },

    async sendMessage() {
      try {
        const data = {
          user_id: parseInt(this.idUser),
          with_id: parseInt(this.currentReceiverId),
          message: this.inputMessage,
        };
        if (!this.inputMessage || !this.currentReceiverId) {
          console.log("no message");
        } else {
          const response = await this.$api.post("message/create", data, {
            headers: {
              Authorization: `Bearer ${this.token}`,
              "Content-Type": "Application/json",
            },
          });
        }
        this.getMessages();
        socket.emit('cc', {})
        this.inputMessage = "";
      } catch (err) {
        console.log(err);
      }
    },
    async getDataGuru() {
      try {
        const response = await this.$api.get("user/show-by-roles?ids=6,2", {
          headers: {
            Authorization: `Bearer ${this.token}`,
            "Content-Type": "Application/json",
          },
        });
        this.dataUser = response.data.data;

      } catch (err) {
        console.log(err);
      }
    },
  },
};

export default PesanCs;
