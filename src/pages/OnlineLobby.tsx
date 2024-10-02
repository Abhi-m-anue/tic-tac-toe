import {
  useNavigate,
} from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContext, useEffect, useState } from "react";

import socket from "../api/socket.tsx";
import GameContext from '../contexts/GameContext.tsx';
import { DialogDescription } from "@radix-ui/react-dialog";


const OnlineLobby = () => {
  const [name, setName] = useState<string>("");
  const [roomId, setRoomId] = useState<string>("");
  const [nameError, setNameError] = useState<boolean>(false);
  const [codeError, setCodeError] = useState<string>("");
  const [createDialogOpen, setCreateDialogOpen] = useState<boolean>(false);
  const [joinDialogOpen, setJoinDialogOpen] = useState<boolean>(false);
  // const [isUserHost, setIsUserHost] = useState<boolean>(false);

  const navigate = useNavigate();

  const { setIsPlayerHost,roomCode, setRoomCode} = useContext(GameContext);

  const handleCreate = () => {
    if (!name) {
      setNameError(true);
      return;
    } else {
      setNameError(false);
    }
    setNameError(false);
    setCreateDialogOpen(false);
    setIsPlayerHost(true);
    socket.emit("createNewRoom");
  };

  const handleJoin = () => {
    if (!name || !roomId) {
      if (!name) {
        setNameError(true);
      } else {
        setNameError(false);
      }
      if (!roomId) {
        setCodeError("Invalid code");
      } else {
        setCodeError("");
      }
      return;
    }

    socket.emit("joinRoom", { roomId: roomId, name: name });
  };

  useEffect(() => {
    setCodeError("");
    setNameError(false);
    if (joinDialogOpen) {
      setName("");
    }
    if (createDialogOpen) {
      setRoomId("");
      setName("");
    }
  }, [joinDialogOpen, createDialogOpen]);

  socket.on("joinedRoom", () => {
    setRoomCode(roomId)
    setCodeError("");
    setNameError(false);
    setJoinDialogOpen(false);
    setIsPlayerHost(false);
    navigate("/online-game");
  });

  socket.on("cantJoinRoom", (data) => {
    setCodeError(data);
  });

  socket.on("newRoomCreated", (data) => {
    setRoomCode(data.gameId);
  });

  socket.on("beginGame", () => {
    navigate("/online-game");
  });

  return (
    <>
      <div className="flex flex-col items-center justify-center h-5/6 gap-5 w-4/5 mx-auto">
        {!roomCode && (
          <>
            <Dialog open={joinDialogOpen} onOpenChange={setJoinDialogOpen}>
              <DialogTrigger asChild>
                <Button className="p-5 h-14 w-52 gap-5 hover:bg-slate-300 hover:text-black slide-to-right">
                  Join Room
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Join Room</DialogTitle>
                  <DialogDescription className="text-sm text-slate-500">Enter the room code shared by the room creator</DialogDescription>
                </DialogHeader>
                <div id="dialog-description" className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label>Name</Label>
                    <Input
                      id="name"
                      placeholder="Give a nick name"
                      className="col-span-3"
                      onChange={(e) => setName(e.target.value)}
                    />
                    {nameError && (
                      <Alert
                        variant="destructive"
                        className="border-none p-0 col-span-3 pl-28 "
                      >
                        <AlertDescription className="w-max p-0">
                          Name cannot be empty
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4 mt-2">
                    <Label>Room code</Label>
                    <Input
                      onChange={(e) => setRoomId(e.target.value)}
                    ></Input>
                    {codeError && (
                      <Alert
                        variant="destructive"
                        className="border-none p-0 col-span-3 pl-28 "
                      >
                        <AlertDescription className="w-max p-0">
                          {codeError}
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    onClick={handleJoin}
                    className="flex items-center"
                  >
                    Join
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="p-5 h-14 w-52 gap-5 hover:bg-slate-300 hover:text-black slide-to-left">
                  Create Room
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create Room</DialogTitle>
                  <DialogDescription className="text-sm text-slate-500">Create a room and share the code with your friend</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label>Name</Label>
                    <Input
                      id="name"
                      placeholder="Give a nick name"
                      className="col-span-3"
                      onChange={(e) => setName(e.target.value)}
                    />
                    {nameError && (
                      <Alert
                        variant="destructive"
                        className="border-none p-0 col-span-3 pl-28 "
                      >
                        <AlertDescription className="w-max p-0">
                          Name cannot be empty
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleCreate}>
                    Create
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        )}
        {roomCode && (
          <div className="text-center">
            <p className="text-4xl mb-9">Your Room Code</p>
            <p className="text-6xl font-bold tracking-widest mb-10 border p-5 rounded-3xl">
              {roomCode}
            </p>
            <div className="flex justify-center gap-4">
              {" "}
              <p className="text-xl font-thin">
                {" "}
                Waiting for opponent to join{" "}
              </p>
              <div className="spinner h-6 w-6 border border-gray-600 border-t-white mt-1"></div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default OnlineLobby;
