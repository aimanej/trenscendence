"use strict";
const Users = [];
const requests = [];
Users.push({ id: 1, username: "Aimane", isOnline: false });
Users.push({ id: 2, username: "sarah", isOnline: false });
// requests.push({id: requests.length + 1, requesterId: 1, receiverId: 2, status:"Pending"});
console.log(Users.length);
console.log(requests.length);
const found = Users.find((A) => A.username === "sarah");
console.log(found);
function sendRequest(requesterId, receiverId) {
    if (requesterId === receiverId) {
        return "cannot send a request to self";
    }
    const found = Users.find((A) => A.id === requesterId);
    const found2 = Users.find((b) => b.id === receiverId);
    if (!found || !found2) {
        return "one of the users does not exist in the user array";
    }
    const prevRequest = requests.find((A) => A.requesterId === requesterId || A.requesterId == receiverId && A.receiverId === receiverId || A.receiverId === requesterId);
    if (prevRequest) {
        return "cannot have duplicate requests";
    }
    requests.push({ id: requests.length + 1, requesterId: requesterId, receiverId: receiverId, status: "Pending" });
    return "Request sent successfully";
}
function acceptRequest(requestId, userId) {
    const rq = requests.find((A) => A.id === requestId);
    if (!rq) {
        return "Friend Request id not found";
    }
    if (rq.status != "Pending") {
        return "Friend Request not Pending";
    }
    if (userId != rq.receiverId) {
        return "not your request to accept";
    }
    rq.status = "Accepted";
    return "Friend Request Accepted";
}
function rejectRequest(requestId, userId) {
    const rq = requests.find((A) => A.id === requestId);
    if (!rq) {
        return "Friend Request id not found";
    }
    if (userId != rq.receiverId) {
        return "not your request to reject";
    }
    if (rq.status != "Pending") {
        return "Friend Request not Pending";
    }
    rq.status = "Rejected";
    return "Friend Request Rejected";
}
function getFriends(userId) {
    const rqs = requests.filter((A) => A.status === "Accepted" && A.receiverId === userId || A.requesterId === userId && A.status === "Accepted");
    const friends = rqs.map((A) => A.requesterId == userId ? A.receiverId : A.requesterId);
    const ret = Users.filter((A) => friends.includes(A.id));
    return ret;
}
console.log(sendRequest(1, 2));
console.log(sendRequest(1, 2));
console.log(sendRequest(2, 1));
